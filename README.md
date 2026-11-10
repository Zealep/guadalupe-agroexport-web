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
