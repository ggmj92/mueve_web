# Mueve Gallery — Guía del Proyecto

## Descripción general

Mueve Gallery es un sitio construido con Next.js 15 (en modo App Router) que presenta la colección de la galería con una experiencia inmersiva. Todas las rutas comparten un `RootLayout` que fija el encabezado y el pie de página, aplica la tipografía Work Sans y sincroniza la temática visual mediante el componente `RouteTheme`. El contenido editorial proviene de Sanity CMS y se consulta en tiempo de renderizado, lo que permite que la página de inicio, las fichas de artistas y el visor de obras muestren datos actualizados sin pasos manuales adicionales.

## Arquitectura del repositorio

- **`src/app`**: Árbol de rutas. Incluye la página de inicio, `/about`, el índice y detalle de artistas (`/artists`, `/artists/[slug]`, `/artists/[slug]/work/[artId]`) y el estudio de Sanity embebido en `/studio`.
- **`src/components`**: Componentes de cliente como el encabezado, los carruseles de héroe/artistas y el visor de obras con navegación superpuesta.
- **`src/sanity`**: Configuración del CMS (clientes reutilizables, utilidades de Live Content, builder de URLs de imágenes y esquemas de documentos para diapositivas, artistas, obras, exhibiciones y la página de “About”).
- **`public`**: Activos estáticos (imágenes por defecto para la página de inicio y recursos compartidos).
- **Archivos raíz**: `next.config.mjs`, `sanity.config.js`, `eslint.config.mjs`, `package.json` y otros ficheros de configuración que controlan la compilación, el linting y la integración con Sanity.

## Páginas y flujo de datos clave

- **Página de inicio** (`src/app/page.js`): Consulta las diapositivas del héroe en Sanity, aplica duraciones por slide y renderiza un `HeroCarousel` con capas de fondo que se desvanecen suavemente.
- **Índice de artistas** (`src/app/artists/page.js`): Recupera slugs y nombres de artistas para listarlos alineados con la cuadrícula global. Desactiva la revalidación para facilitar la vista previa de cambios durante el desarrollo.
- **Detalle de artista** (`src/app/artists/[slug]/page.js`): Combina la ficha del artista con sus obras relacionadas, normaliza los metadatos para el `ArtistCarousel` y muestra biografía + rejilla de obras enlazables.
- **Detalle de obra** (`src/app/artists/[slug]/work/[artId]/page.js`): Reutiliza la consulta de artista, calcula el índice inicial de la obra y usa `ArtworkViewer` para mantener la URL en sincronía, fijar la columna de metadatos y ofrecer navegación manual.
- **Página About** (`src/app/about/page.js`): Presenta contenido bilingüe con maquetación tipográfica personalizada.
- **Sanity Studio** (`src/app/studio/[[...tool]]/page.js`): Monta la interfaz de edición directamente dentro del proyecto Next.

## Estilos y experiencia de usuario

- Variables globales en `src/app/globals.css` definen espaciamientos, anchos de columna y colores; el body recibe clases como `is-home` para recolorear la navegación según la ruta.
- `layout.module.css` establece el header/footer fijos y el espaciado base; cada feature tiene su propio módulo CSS para patrones complejos (p. ej. transiciones de fondo, carruseles de pantalla completa o cuadrículas con metadatos fijos).

## Gestión de contenido

- `sanity.config.js` configura el Studio, añade el Structure Builder y la herramienta Vision.
- Los esquemas de `src/sanity/schemaTypes` describen diapositivas, artistas, obras, exhibiciones y el contenido “About”.
- `src/sanity/env.js` centraliza los valores `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` y `NEXT_PUBLIC_SANITY_API_VERSION`, con valores por defecto que permiten arrancar el proyecto rápidamente.【F:src/sanity/env.js†L1-L8】

## Herramientas y scripts

- **Scripts de npm** (`package.json`):
  - `npm run dev`: inicia el servidor de desarrollo con Turbopack.
  - `npm run build`: genera el build de producción.
  - `npm run start`: levanta el servidor en modo producción.
  - `npm run lint`: ejecuta ESLint sobre `.js`, `.jsx` y CSS Modules.
  - `npm run format`: aplica Prettier al repositorio completo.【F:package.json†L7-L34】
- **Calidad de código**: Husky y lint-staged formatean y corrigen automáticamente antes de cada commit.

## Requisitos previos

1. Node.js 20 o superior y npm 10 (o bien pnpm/yarn/bun si prefieres).
2. Acceso al proyecto de Sanity con las credenciales adecuadas.
3. Variables de entorno opcionales (si necesitas conectar con otro dataset/proyecto):
   ```bash
   NEXT_PUBLIC_SANITY_PROJECT_ID="<tu-project-id>"
   NEXT_PUBLIC_SANITY_DATASET="production"
   NEXT_PUBLIC_SANITY_API_VERSION="2025-01-01"
   ```

## Puesta en marcha (paso a paso)

1. **Clonar el repositorio**:
   ```bash
   git clone git@github.com:<tu-usuario>/<tu-repo>.git
   cd <tu-repo>
   ```
2. **Instalar dependencias**:
   ```bash
   npm install
   ```
3. **Configurar variables de entorno** (opcional si usas los defaults). Crea `.env.local` y define las variables anteriores si necesitas sobrescribirlas.
4. **Levantar el proyecto en desarrollo**:
   ```bash
   npm run dev
   ```
   El sitio estará disponible en [http://localhost:3000](http://localhost:3000).
5. **Ejecutar comprobaciones** antes de abrir un PR o entregar trabajo:
   ```bash
   npm run lint
   ```
6. **Build de producción** (para validar antes de desplegar):
   ```bash
   npm run build
   npm run start
   ```

## Flujo de trabajo recomendado

1. **Sincroniza la rama principal**: `git checkout main && git pull origin main`.
2. **Crea una rama descriptiva** para tu trabajo: `git checkout -b feature/<nombre>`.
3. **Desarrolla** siguiendo los patrones existentes (componentes reutilizables, CSS modules, consultas a Sanity).
4. **Ejecuta `npm run lint`** y corrige cualquier incidencia.
5. **Haz commits pequeños y descriptivos** (`git commit -m "feat: añade carrusel de ferias"`).
6. **Actualiza la documentación** (incluido este README) cuando añadas nuevas rutas, esquemas o scripts.
7. **Sube la rama** (`git push origin feature/<nombre>`) y abre un Pull Request.
8. **Solicita revisión** y atiende comentarios antes de fusionar.

## Próximos pasos sugeridos

- Implementar las rutas pendientes (`/fairs`, `/exhibitions`, `/publications`) y sus esquemas en Sanity.
- Integrar `sanityFetch`/`SanityLive` para vista previa en vivo.
- Afinar la experiencia responsive de carruseles y del visor de obras en móviles.
