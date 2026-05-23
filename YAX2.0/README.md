# YA´x 2.0 — Plataforma Mayorista Agrícola

Sitio web B2B con **registro**, **inicio de sesión** y **base de datos SQLite**.

## Cómo ejecutar el proyecto

### Opción 1 — Doble clic (recomendado)

1. Abre la carpeta `YAX2.0` en el escritorio.
2. Haz doble clic en **`iniciar.bat`**.
3. Abre el navegador en: **http://localhost:3000**

### Opción 2 — Terminal

```bash
cd "C:\Users\Elizabeth Canto\Desktop\YAX2.0\YAX2.0"
node server.js
```

Luego visita **http://localhost:3000**

> **Importante:** No abras `index.html` directamente con doble clic. El registro y el login necesitan el servidor (`node server.js`) para guardar usuarios en la base de datos.

## Base de datos

- Archivo: `data/yax.db` (SQLite)
- Tabla `users`: nombres, correo, contraseña cifrada, rol (comprador/vendedor), etc.
- Tabla `sessions`: tokens de sesión al iniciar sesión
- Las contraseñas se guardan con **scrypt** (no en texto plano).

## API disponible

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/register` | Crear cuenta nueva |
| POST | `/api/login` | Iniciar sesión (devuelve token) |
| POST | `/api/logout` | Cerrar sesión |
| GET | `/api/me` | Usuario actual (requiere token) |

## Probar registro e inicio de sesión

1. Inicia el servidor con `iniciar.bat`.
2. En el sitio, ve a **Registrarse** y completa el formulario.
3. Ve a **Ingresar** e inicia sesión con el mismo correo y contraseña.
4. Marca **Mantener sesión iniciada** para permanecer conectado 30 días (sin marcar: 24 horas).
5. Ya podrás ver precios por proveedor y usar el carrito.

## Panel de vendedor

1. Regístrate o inicia sesión eligiendo rol **Vendedor / Proveedor**.
2. Tras iniciar sesión irás al **Panel de Vendedor** (también en el menú: **Mis Productos**).
3. Publica productos con: nombre, categoría, cantidad, unidad, precio, departamento, municipio y ubicación.
4. Tus ofertas aparecen en el catálogo bajo **Ofertas de vendedores registrados**.

## Requisitos

- [Node.js](https://nodejs.org/) instalado (versión 18 o superior recomendada).

## Estructura

```
YAX2.0/
├── index.html      ← Página principal
├── server.js       ← Servidor y API
├── iniciar.bat     ← Iniciar con un clic
├── data/yax.db     ← Base de datos (se crea sola)
└── img/            ← Imágenes (opcional)
```
