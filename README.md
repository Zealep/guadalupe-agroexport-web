# Web de Agroexportadora Guadalupe (agroguadalupe.com)

Sitio estático hecho con [Astro](https://astro.build). Reemplaza la web anterior en WordPress.
No necesita base de datos, PHP ni plugins: el resultado son archivos HTML que se pueden
alojar gratis (Netlify, Cloudflare Pages, etc.).

## Requisitos

- [Node.js](https://nodejs.org) 20 o superior

## Comandos

```bash
npm install       # solo la primera vez
npm run dev       # ver la web en http://localhost:4321 mientras editas
npm run build     # generar la web final en la carpeta dist/
```

## ¿Dónde se edita cada cosa?

| Qué quieres cambiar | Archivo |
|---|---|
| Textos de todas las páginas (ES y EN) | `src/i18n.ts` |
| Productos: mercados, presentación, variedades, temporadas, fotos | `src/data/productos.json` |
| Correo, WhatsApp, direcciones, redes sociales | `src/data/sitio.json` |
| Países, certificaciones y valores | `src/data/catalogos.json` |
| Colores y estilos | `src/styles/global.css` (variables al inicio) |
| Imágenes | `public/img/` (`productos/`, `sitio/`, `iconos/`) |

### Añadir un producto

1. Sube sus imágenes a `public/img/productos/` (tarjeta con fondo transparente, imagen grande y fotos de galería).
2. Copia un bloque de producto en `src/data/productos.json` y cambia los datos (`id`, `slug` en `es` y `en`, etc.).
3. `npm run build` y publica. Las páginas en los dos idiomas se crean solas.

## Formularios

Los formularios (contacto y suscripción) envían los mensajes a `info@agroguadalupe.com`
mediante [Web3Forms](https://web3forms.com) (gratis hasta 250 mensajes al mes):

1. Entra a web3forms.com, escribe `info@agroguadalupe.com` y te llegará una *Access Key* a ese correo.
2. Pégala en `src/data/sitio.json` → `formularios.web3formsKey`.
3. Vuelve a generar y publicar la web.

Mientras la clave esté vacía, al enviar se abre el programa de correo del visitante con el mensaje ya escrito.

## Publicar (Netlify)

1. Crea una cuenta en [netlify.com](https://netlify.com).
2. **Opción simple:** `npm run build` y arrastra la carpeta `dist/` en *Sites → Add new site → Deploy manually*.
   **Opción automática:** sube este proyecto a GitHub y conéctalo (Build command: `npm run build`, Publish directory: `dist`).
3. En *Domain management* añade `agroguadalupe.com` y `www.agroguadalupe.com`. Netlify te dirá qué registros DNS poner.
4. En el panel del dominio cambia **solo** el registro `A` de `agroguadalupe.com` (y el `CNAME` de `www`) por los que indique Netlify.
   ⚠️ **No toques los registros `MX` ni `TXT`**: el correo `@agroguadalupe.com` funciona con Google Workspace y depende de ellos.
5. Netlify activa el HTTPS automáticamente en unos minutos.

El archivo `public/_redirects` redirige las direcciones antiguas de WordPress (p. ej. `/productoscb/`, `/en/productos/garlic/`)
a las nuevas, para no perder posicionamiento en Google.

## Publicar en un droplet de DigitalOcean (alternativa a Netlify)

Los archivos están en `deploy/`. El servidor solo necesita Nginx: la web se compila en tu PC.

**Una sola vez** (preparar el servidor; usa Git Bash en tu PC):

```bash
scp deploy/preparar-servidor.sh deploy/agroguadalupe.conf root@IP_DEL_DROPLET:/root/
ssh root@IP_DEL_DROPLET "bash /root/preparar-servidor.sh"
```

Instala Nginx, Certbot, el firewall, 2 GB de swap y las actualizaciones de seguridad automáticas.

**Cada vez que cambies algo:**

```bash
bash deploy/publicar.sh IP_DEL_DROPLET
```

**Dominio y HTTPS:** en el panel del dominio pon los registros `A` de `@` y `www` con la IP del droplet
(⚠️ sin tocar `MX` ni `TXT`). Cuando ya apunten al droplet, en el servidor:

```bash
certbot --nginx -d agroguadalupe.com -d www.agroguadalupe.com --redirect
```

**Volver a la versión anterior** (en el servidor):

```bash
ls -1t /var/www/agroguadalupe/releases          # la 2.ª de la lista es la anterior
ln -sfn /var/www/agroguadalupe/releases/NOMBRE /var/www/agroguadalupe/current
```

### Si el droplet se comparte con otras apps (p. ej. la app Flutter con PostgreSQL)

- Nginx del servidor es la única entrada (puertos 80/443). Cada app va en su propio subdominio con su archivo en
  `/etc/nginx/sites-available/`, y sus contenedores escuchan solo en local, p. ej. `127.0.0.1:8080:8080`.
- En `docker-compose` **nunca** publiques `5432:5432`: Docker se salta el firewall y la base de datos quedaría
  expuesta a internet. Si hace falta, usa `127.0.0.1:5432:5432`.
- Haz copias de la base de datos (`pg_dump`) y activa los Backups del droplet.

## Estructura

```
src/
  pages/              rutas (una por página, en español y en /en/)
  components/paginas/ diseño de cada página (sirve para los dos idiomas)
  components/         cabecera, pie, banner, tarjeta de producto, formulario
  layouts/Layout.astro plantilla común (SEO, idiomas, WhatsApp flotante)
  data/               contenido editable
public/               imágenes, _redirects, robots.txt
```
