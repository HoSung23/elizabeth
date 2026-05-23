# Publicar YA´x en Hostinger (paso a paso)

Guía para **hPanel** de Hostinger con **Node.js Web App**.

Documentación oficial: [Desplegar Node.js en Hostinger](https://www.hostinger.com/support/how-to-deploy-a-nodejs-website-in-hostinger/)

---

## Antes de empezar — verifica tu plan

Node.js en Hostinger funciona en:

- **Business Web Hosting**
- **Cloud Startup / Professional / Enterprise**

Si tienes plan **Single** o **Premium** sin Node.js, debes **actualizar el plan** en hPanel → Planes → Mejorar.

---

## Paso 1 — Crear el archivo ZIP en tu PC

1. Abre la carpeta: `Desktop\YAX2.0\YAX2.0`
2. Selecciona estos archivos y carpetas:
   - `index.html`
   - `server.js`
   - `package.json`
   - `img` (carpeta completa con logos)
   - `data` (carpeta vacía; crea una si no existe)
3. Clic derecho → **Comprimir en ZIP** → nómbralo `yax-sitio.zip`

**No incluyas:** `Untitled-1.html`, fotos `.jpg` de prueba, `iniciar.bat`, `README.md` (opcional).

O ejecuta en PowerShell (desde la carpeta YAX2.0):

```powershell
cd "C:\Users\Elizabeth Canto\Desktop\YAX2.0\YAX2.0"
Compress-Archive -Path index.html,server.js,package.json,img,data -DestinationPath ..\yax-sitio.zip -Force
```

---

## Paso 2 — Dominio en Hostinger

### Si el dominio YA está en Hostinger con otra web (WordPress, HTML…)

Hostinger pide crear la app Node como **sitio nuevo**:

1. hPanel → **Sitios web** → haz **copia de seguridad** de lo que tengas
2. **Elimina** el sitio anterior de ese dominio (solo si aceptas reemplazarlo)
3. Luego sigue el Paso 3

### Si el dominio es nuevo o está libre

Sigue directo al Paso 3.

### DNS (si el dominio está en otro proveedor)

En donde compraste el dominio, apunta los nameservers a Hostinger (hPanel te los muestra en **Dominios**).

---

## Paso 3 — Crear aplicación Node.js en hPanel

1. Entra a **https://hpanel.hostinger.com**
2. Menú **Sitios web** → **Añadir sitio web**
3. Elige **Aplicación Node.js** (o **Node.js Apps**)
4. Método: **Subir archivos** / **Upload ZIP**
5. Sube `yax-sitio.zip`

---

## Paso 4 — Configuración IMPORTANTE (tipo "Other")

Cuando Hostinger detecte el proyecto, elige o confirma:

| Campo | Valor para YA´x |
|-------|------------------|
| **Framework** | **Other** (Otro) |
| **Versión Node.js** | **22.x** (o 24.x; mínimo 22) |
| **Archivo de entrada** | `server.js` |
| **Directorio de salida** | `.` (punto) o déjalo vacío / raíz del proyecto |
| **Comando de build** | Déjalo vacío o `npm start` si pide comando |

Si hay campo **Start command** / **Run command**:

```bash
node server.js
```

o

```bash
npm start
```

### Variables de entorno (recomendado)

En **Environment variables** del panel Node.js, agrega:

| Nombre | Valor |
|--------|--------|
| `NODE_ENV` | `production` |

El **PORT** normalmente lo asigna Hostinger solo; no lo cambies salvo que el panel lo pida.

---

## Paso 5 — Desplegar

1. Clic en **Deploy** / **Desplegar**
2. Espera a que termine (puede tardar 2–10 minutos)
3. Si sale error de **node:sqlite**, la versión de Node es muy baja → elige **Node 22.x**

---

## Paso 6 — SSL (HTTPS)

1. hPanel → tu sitio → **SSL**
2. Activa **SSL gratuito** (Let's Encrypt)
3. Espera unos minutos
4. Abre `https://tudominio.com`

---

## Paso 7 — Probar el sitio

- [ ] Abre tu dominio con `https://`
- [ ] Se ve el catálogo YA´x
- [ ] **Registrarse** crea una cuenta
- [ ] **Ingresar** funciona
- [ ] Los logos se ven (`img/logo-yax.png`)

---

## Carpeta `data/` y base de datos

- Al primer registro se crea `data/yax.db` en el servidor
- **Copia de seguridad:** cada mes descarga `data/yax.db` desde el **Administrador de archivos** de Hostinger  
  Ruta aproximada: `/domains/tudominio.com/nodejs/` o la carpeta de tu app

---

## Si algo falla

| Error | Qué hacer |
|-------|-----------|
| Plan sin Node.js | Mejorar a **Business** o **Cloud** |
| `node:sqlite` no encontrado | Node &lt; 22 → cambiar a **22.x** en ajustes y **Redeploy** |
| Página en blanco | Revisa **Deployment log** en hPanel |
| Registro no guarda | App no está corriendo; reinicia con botón **Restart** en el panel Node |
| 404 en rutas | Normal en esta app; la página principal es `/` → `index.html` |

### Reiniciar sin volver a subir ZIP

En el panel de la app Node.js → botón **Restart** (junto a "Running").

### Volver a desplegar

**Settings & Redeploy** → sube ZIP nuevo o redeploy.

---

## Conectar dominio que ya tienes en Hostinger

1. **Sitios web** → selecciona el dominio
2. Si era WordPress, elimina el sitio antiguo (con backup)
3. **Añadir sitio** → Node.js → sube ZIP
4. Asigna el mismo dominio

---

## Soporte Hostinger

Chat 24/7 en hPanel. Puedes decir:

> "Tengo una aplicación Node.js personalizada con archivo de entrada server.js y framework Other. Necesito Node.js 22."

---

## Resumen rápido

```
ZIP → hPanel → Añadir sitio → Node.js → Subir ZIP
→ Framework: Other → Entry: server.js → Node 22
→ Deploy → SSL → https://tudominio.com
```
