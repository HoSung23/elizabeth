/**
 * YA´x 2.0 — Servidor local con base de datos SQLite
 * Ejecutar: node server.js
 * Abrir: http://localhost:3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { DatabaseSync } = require('node:sqlite');

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
const ROOT = __dirname;
const DB_PATH = path.join(ROOT, 'data', 'yax.db');
const SESSION_DAYS = 1;
const SESSION_REMEMBER_DAYS = 30;

const VALID_CATEGORIES = ['frutas', 'verduras', 'granos', 'proteinas', 'tuberculos', 'mariscos', 'otros'];

fs.mkdirSync(path.join(ROOT, 'data'), { recursive: true });

const db = new DatabaseSync(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    names TEXT NOT NULL,
    last_names TEXT NOT NULL,
    business TEXT,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    nit TEXT,
    email TEXT UNIQUE NOT NULL COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'buyer',
    cert_type TEXT DEFAULT 'maga',
    status TEXT DEFAULT 'active',
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires_at TEXT NOT NULL,
    remember INTEGER DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS seller_products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seller_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    quantity REAL NOT NULL,
    unit TEXT NOT NULL,
    price REAL NOT NULL,
    department TEXT NOT NULL,
    municipality TEXT,
    location_detail TEXT,
    status TEXT DEFAULT 'active',
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

try {
  db.exec('ALTER TABLE sessions ADD COLUMN remember INTEGER DEFAULT 0');
} catch (e) { /* columna ya existe */ }

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const check = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(check, 'hex'));
}

function createToken() {
  return crypto.randomBytes(32).toString('hex');
}

function userToPublic(row) {
  return {
    id: row.id,
    names: row.names,
    lastNames: row.last_names,
    business: row.business || '',
    address: row.address,
    phone: row.phone,
    nit: row.nit || '',
    email: row.email,
    role: row.role,
    certType: row.cert_type,
    status: row.status,
  };
}

function getUserByToken(token) {
  if (!token) return null;
  const row = db.prepare(`
    SELECT u.* FROM users u
    INNER JOIN sessions s ON s.user_id = u.id
    WHERE s.token = ? AND datetime(s.expires_at) > datetime('now')
  `).get(token);
  return row || null;
}

function requireSeller(user) {
  if (!user) return { error: 'No autenticado', status: 401 };
  if (user.role !== 'seller') return { error: 'Solo vendedores pueden acceder a esta sección.', status: 403 };
  return null;
}

function productToPublic(row, seller = null) {
  const item = {
    id: row.id,
    sellerId: row.seller_id,
    name: row.name,
    category: row.category,
    description: row.description || '',
    quantity: row.quantity,
    unit: row.unit,
    price: row.price,
    department: row.department,
    municipality: row.municipality || '',
    locationDetail: row.location_detail || '',
    status: row.status,
    createdAt: row.created_at,
  };
  if (seller) {
    item.sellerName = seller.business || `${seller.names} ${seller.last_names}`;
    item.sellerPhone = seller.phone;
    item.sellerCert = seller.cert_type;
  }
  return item;
}

function createSession(userId, remember) {
  const sessionToken = createToken();
  const expires = new Date();
  expires.setDate(expires.getDate() + (remember ? SESSION_REMEMBER_DAYS : SESSION_DAYS));
  db.prepare('INSERT INTO sessions (user_id, token, expires_at, remember) VALUES (?, ?, ?, ?)').run(
    userId,
    sessionToken,
    expires.toISOString(),
    remember ? 1 : 0
  );
  return { token: sessionToken, expiresAt: expires.toISOString(), remember: !!remember };
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
      if (data.length > 1e6) {
        req.destroy();
        reject(new Error('Body too large'));
      }
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch {
        reject(new Error('JSON inválido'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
};

function serveStatic(req, res) {
  let urlPath = req.url.split('?')[0];
  if (urlPath === '/') urlPath = '/index.html';
  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('No encontrado');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}

async function handleApi(req, res) {
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '').trim();
  const url = req.url.split('?')[0];
  const method = req.method;

  try {
    if (method === 'GET' && url === '/api/me') {
      const user = getUserByToken(token);
      if (!user) return sendJson(res, 401, { ok: false, error: 'No autenticado' });
      return sendJson(res, 200, { ok: true, user: userToPublic(user) });
    }

    if (method === 'POST' && url === '/api/register') {
      const body = await readBody(req);
      const names = (body.names || '').trim();
      const lastNames = (body.lastNames || '').trim();
      const business = (body.business || '').trim();
      const address = (body.address || '').trim();
      const phone = (body.phone || '').trim();
      const nit = (body.nit || '').trim();
      const email = (body.email || '').trim().toLowerCase();
      const password = body.password || '';
      const role = body.role === 'seller' ? 'seller' : 'buyer';
      const certType = body.certType === 'yax' ? 'yax' : 'maga';

      if (!names || !lastNames || !email || !password || !address || !phone) {
        return sendJson(res, 400, { ok: false, error: 'Completa todos los campos obligatorios.' });
      }
      if (password.length < 8) {
        return sendJson(res, 400, { ok: false, error: 'La contraseña debe tener al menos 8 caracteres.' });
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return sendJson(res, 400, { ok: false, error: 'Correo electrónico no válido.' });
      }

      const exists = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
      if (exists) {
        return sendJson(res, 409, { ok: false, error: 'Este correo ya está registrado. Inicia sesión o usa otro correo.' });
      }

      const insert = db.prepare(`
        INSERT INTO users (names, last_names, business, address, phone, nit, email, password_hash, role, cert_type)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      const result = insert.run(names, lastNames, business, address, phone, nit, email, hashPassword(password), role, certType);
      const user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);

      return sendJson(res, 201, { ok: true, user: userToPublic(user), message: 'Cuenta creada correctamente.' });
    }

    if (method === 'POST' && url === '/api/login') {
      const body = await readBody(req);
      const email = (body.email || '').trim().toLowerCase();
      const password = body.password || '';

      if (!email || !password) {
        return sendJson(res, 400, { ok: false, error: 'Correo y contraseña son obligatorios.' });
      }

      const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
      if (!user || !verifyPassword(password, user.password_hash)) {
        return sendJson(res, 401, { ok: false, error: 'Correo o contraseña incorrectos.' });
      }

      const remember = !!body.rememberMe;
      const session = createSession(user.id, remember);

      return sendJson(res, 200, {
        ok: true,
        token: session.token,
        remember: session.remember,
        expiresAt: session.expiresAt,
        user: userToPublic(user),
      });
    }

    /* ── Productos de vendedores (público) ── */
    if (method === 'GET' && url === '/api/products/seller') {
      const rows = db.prepare(`
        SELECT sp.*, u.names, u.last_names, u.business, u.phone, u.cert_type
        FROM seller_products sp
        INNER JOIN users u ON u.id = sp.seller_id
        WHERE sp.status = 'active' AND u.role = 'seller'
        ORDER BY sp.created_at DESC
      `).all();
      const list = rows.map(r => productToPublic(r, {
        names: r.names,
        last_names: r.last_names,
        business: r.business,
        phone: r.phone,
        cert_type: r.cert_type,
      }));
      return sendJson(res, 200, { ok: true, products: list });
    }

    /* ── Panel vendedor: listar mis productos ── */
    if (method === 'GET' && url === '/api/seller/products') {
      const user = getUserByToken(token);
      const denied = requireSeller(user);
      if (denied) return sendJson(res, denied.status, { ok: false, error: denied.error });
      const rows = db.prepare(
        'SELECT * FROM seller_products WHERE seller_id = ? ORDER BY created_at DESC'
      ).all(user.id);
      return sendJson(res, 200, { ok: true, products: rows.map(r => productToPublic(r)) });
    }

    /* ── Panel vendedor: crear producto ── */
    if (method === 'POST' && url === '/api/seller/products') {
      const user = getUserByToken(token);
      const denied = requireSeller(user);
      if (denied) return sendJson(res, denied.status, { ok: false, error: denied.error });

      const body = await readBody(req);
      const name = (body.name || '').trim();
      const category = (body.category || '').trim().toLowerCase();
      const description = (body.description || '').trim();
      const quantity = parseFloat(body.quantity);
      const unit = (body.unit || '').trim();
      const price = parseFloat(body.price);
      const department = (body.department || '').trim();
      const municipality = (body.municipality || '').trim();
      const locationDetail = (body.locationDetail || '').trim();

      if (!name || !category || !unit || !department) {
        return sendJson(res, 400, { ok: false, error: 'Completa nombre, categoría, unidad y departamento.' });
      }
      if (!VALID_CATEGORIES.includes(category)) {
        return sendJson(res, 400, { ok: false, error: 'Categoría no válida.' });
      }
      if (isNaN(quantity) || quantity <= 0) {
        return sendJson(res, 400, { ok: false, error: 'La cantidad debe ser mayor a 0.' });
      }
      if (isNaN(price) || price <= 0) {
        return sendJson(res, 400, { ok: false, error: 'El precio debe ser mayor a 0.' });
      }

      const result = db.prepare(`
        INSERT INTO seller_products
          (seller_id, name, category, description, quantity, unit, price, department, municipality, location_detail)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(user.id, name, category, description, quantity, unit, price, department, municipality, locationDetail);

      const row = db.prepare('SELECT * FROM seller_products WHERE id = ?').get(result.lastInsertRowid);
      return sendJson(res, 201, { ok: true, product: productToPublic(row), message: 'Producto publicado.' });
    }

    const productIdMatch = url.match(/^\/api\/seller\/products\/(\d+)$/);
    if (productIdMatch) {
      const productId = parseInt(productIdMatch[1], 10);
      const user = getUserByToken(token);
      const denied = requireSeller(user);
      if (denied) return sendJson(res, denied.status, { ok: false, error: denied.error });

      const existing = db.prepare('SELECT * FROM seller_products WHERE id = ? AND seller_id = ?').get(productId, user.id);
      if (!existing) {
        return sendJson(res, 404, { ok: false, error: 'Producto no encontrado.' });
      }

      if (method === 'PUT') {
        const body = await readBody(req);
        const name = (body.name || existing.name).trim();
        const category = (body.category || existing.category).trim().toLowerCase();
        const description = (body.description !== undefined ? body.description : existing.description || '').trim();
        const quantity = body.quantity !== undefined ? parseFloat(body.quantity) : existing.quantity;
        const unit = (body.unit || existing.unit).trim();
        const price = body.price !== undefined ? parseFloat(body.price) : existing.price;
        const department = (body.department || existing.department).trim();
        const municipality = (body.municipality !== undefined ? body.municipality : existing.municipality || '').trim();
        const locationDetail = (body.locationDetail !== undefined ? body.locationDetail : existing.location_detail || '').trim();

        if (!VALID_CATEGORIES.includes(category)) {
          return sendJson(res, 400, { ok: false, error: 'Categoría no válida.' });
        }
        if (quantity <= 0 || price <= 0) {
          return sendJson(res, 400, { ok: false, error: 'Cantidad y precio deben ser mayores a 0.' });
        }

        db.prepare(`
          UPDATE seller_products SET
            name = ?, category = ?, description = ?, quantity = ?, unit = ?, price = ?,
            department = ?, municipality = ?, location_detail = ?, updated_at = datetime('now')
          WHERE id = ? AND seller_id = ?
        `).run(name, category, description, quantity, unit, price, department, municipality, locationDetail, productId, user.id);

        const row = db.prepare('SELECT * FROM seller_products WHERE id = ?').get(productId);
        return sendJson(res, 200, { ok: true, product: productToPublic(row), message: 'Producto actualizado.' });
      }

      if (method === 'DELETE') {
        db.prepare('DELETE FROM seller_products WHERE id = ? AND seller_id = ?').run(productId, user.id);
        return sendJson(res, 200, { ok: true, message: 'Producto eliminado.' });
      }
    }

    if (method === 'POST' && url === '/api/logout') {
      if (token) {
        db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
      }
      return sendJson(res, 200, { ok: true });
    }

    if (method === 'GET' && url === '/api/users/count') {
      const count = db.prepare('SELECT COUNT(*) as n FROM users').get().n;
      return sendJson(res, 200, { ok: true, count });
    }

    if (method === 'GET' && url === '/api/sellers/directory') {
      const rows = db.prepare(`
        SELECT id, names, last_names, business, address, phone, cert_type, created_at
        FROM users WHERE role = 'seller' AND status = 'active'
        ORDER BY created_at DESC
      `).all();
      const sellers = rows.map(u => {
        const prods = db.prepare(
          'SELECT * FROM seller_products WHERE seller_id = ? AND status = ? ORDER BY created_at DESC'
        ).all(u.id, 'active');
        const displayName = (u.business || '').trim() || `${u.names} ${u.last_names}`.trim();
        const initials = displayName.replace(/[^A-Za-zÁÉÍÓÚáéíóúñÑ]/g, '').substring(0, 2).toUpperCase() || 'VD';
        return {
          id: u.id,
          names: u.names,
          lastNames: u.last_names,
          business: u.business || '',
          address: u.address,
          phone: u.phone,
          certType: u.cert_type,
          displayName,
          letter: initials,
          products: prods.map(p => productToPublic(p)),
        };
      });
      return sendJson(res, 200, {
        ok: true,
        sellers,
        registeredCount: sellers.length,
      });
    }

    sendJson(res, 404, { ok: false, error: 'Ruta no encontrada' });
  } catch (err) {
    console.error('API error:', err);
    sendJson(res, 500, { ok: false, error: 'Error interno del servidor' });
  }
}

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/api/')) {
    return handleApi(req, res);
  }
  serveStatic(req, res);
});

server.listen(PORT, HOST, () => {
  const count = db.prepare('SELECT COUNT(*) as n FROM users').get().n;
  console.log('');
  console.log('  ╔══════════════════════════════════════════╗');
  console.log('  ║   YA´x 2.0 — Servidor en línea           ║');
  console.log('  ╠══════════════════════════════════════════╣');
  console.log(`  ║   Puerto: ${String(PORT).padEnd(31)}║`);
  console.log(`  ║   Base de datos: data/yax.db             ║`);
  console.log(`  ║   Usuarios registrados: ${String(count).padEnd(17)}║`);
  console.log('  ╚══════════════════════════════════════════╝');
  console.log('');
});
