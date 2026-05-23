# Publicar YA´x en Internet (dominio + hosting)

Tu proyecto **no es solo HTML**: necesita **Node.js** corriendo `server.js` (API + base de datos SQLite).

---

## Requisitos del hosting

| Requisito | Detalle |
|-----------|---------|
| **Node.js** | Versión **22 o superior** (usa SQLite integrado) |
| **Carpeta `data/`** | Permisos de escritura (para `yax.db`) |
| **Dominio** | Apuntando al servidor (registro DNS) |
| **SSL** | HTTPS recomendado (Let's Encrypt en cPanel) |

> Si tu hosting **solo tiene PHP** (sin Node.js), no funcionará tal cual. Necesitas plan con **Node.js** (Hostinger Business+, cPanel “Setup Node.js App”, VPS, Render, etc.).

---

## Archivos que debes subir

Sube **todo el contenido** de la carpeta `YAX2.0` (la interna, donde está `index.html`):

```
index.html
server.js
package.json
img/          (logos)
data/         (vacía o con yax.db; debe poder escribirse)
```

**No es obligatorio subir:** `Untitled-1.html`, `iniciar.bat`, fotos de prueba `.jpg` si no las usas.

---

## Opción A — Hosting con cPanel (Hostinger, GoDaddy, Namecheap, etc.)

### 1. Subir archivos
- Entra a **Administrador de archivos** o **FTP** (FileZilla).
- Sube la carpeta del proyecto a:
  - `public_html` (sitio principal), o
  - `public_html/tudominio` (subcarpeta).

### 2. Crear aplicación Node.js
En cPanel busca: **Setup Node.js App** / **Aplicación Node.js**:

| Campo | Valor |
|-------|--------|
| Versión Node | **22.x** (la más alta disponible) |
| Modo | Production |
| Directorio raíz | Carpeta donde subiste los archivos |
| Archivo de inicio | `server.js` |
| Puerto | El que asigne el panel (ej. 3000) |

Guarda y pulsa **Run NPM Install** si aparece (no hay dependencias npm, está bien).

### 3. Enlazar tu dominio
- En la app Node.js, asigna el dominio o usa el proxy que ofrece cPanel.
- En **Dominios**, apunta el dominio a la carpeta de la aplicación.
- Activa **SSL** (AutoSSL / Let's Encrypt).

### 4. Permisos
- Carpeta `data/` → permisos **755** o **775** (escritura).

### 5. Probar
- Abre `https://tudominio.com`
- Registra un usuario de prueba y verifica login.

---

## Opción B — VPS (servidor Linux: DigitalOcean, Linode, Hostinger VPS)

### 1. Conectar por SSH y subir proyecto
```bash
# En el servidor (ejemplo Ubuntu)
sudo apt update
sudo apt install -y nodejs  # o instala Node 22 desde nodejs.org

mkdir -p /var/www/yax
# Sube archivos con FileZilla o scp a /var/www/yax
```

### 2. Instalar Node 22+ si hace falta
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # debe ser v22+
```

### 3. Iniciar con PM2 (recomendado)
```bash
cd /var/www/yax
sudo npm install -g pm2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

### 4. Nginx + dominio + HTTPS
```bash
sudo apt install -y nginx certbot python3-certbot-nginx
```

Copia y edita `deploy/nginx-ejemplo.conf` → `/etc/nginx/sites-available/yax`

```bash
sudo ln -s /etc/nginx/sites-available/yax /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d tudominio.com -d www.tudominio.com
```

### 5. DNS
En tu proveedor de dominio:
- **A** → IP del VPS  
- **www** → CNAME a `tudominio.com` (o A también)

---

## Opción C — Render.com (rápido, gratis para probar)

1. Crea cuenta en [render.com](https://render.com)
2. **New → Web Service**
3. Conecta GitHub o sube el código
4. Build: vacío | Start: `node server.js`
5. Environment: `NODE_ENV=production`
6. En tu dominio: Settings → Custom Domain → agrega tu dominio y configura DNS según Render

> En plan gratis el disco puede reiniciarse; para producción seria mejor VPS o hosting con Node persistente.

---

## Configurar DNS del dominio (cualquier opción)

En el panel donde compraste el dominio:

| Tipo | Nombre | Valor |
|------|--------|--------|
| A | @ | IP de tu servidor |
| A o CNAME | www | IP o tudominio.com |

Espera 15 min – 48 h la propagación.

---

## Después de publicar — checklist

- [ ] `https://tudominio.com` abre la página principal
- [ ] Registro de usuario funciona
- [ ] Inicio de sesión funciona
- [ ] Carpeta `data/yax.db` se crea sola al registrar
- [ ] HTTPS activo (candado verde)
- [ ] No abrir solo `index.html` por FTP sin Node (no guardará usuarios)

---

## Copias de seguridad

Descarga periódicamente desde el servidor:
- `data/yax.db` (todos los usuarios y productos)

---

## Problemas frecuentes

| Problema | Solución |
|----------|----------|
| “Cannot find module node:sqlite” | Node muy viejo; usa **Node 22+** |
| Registro no guarda | Node no está corriendo o `data/` sin permiso de escritura |
| Página en blanco | Revisa logs en cPanel o `pm2 logs yax` |
| Solo funciona localhost | Falta proxy/nginx o dominio mal apuntado |

---

## Hostinger

Guía detallada solo para Hostinger: **`HOSTINGER.md`**

Ejecuta **`crear-zip-hostinger.bat`** para generar `yax-sitio.zip` listo para subir.
