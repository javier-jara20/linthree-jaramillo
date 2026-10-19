# Xavii JR Jaramillo | Mis redes

Proyecto personal tipo landing page / Linktree para mostrar redes sociales, proyectos destacados y contenido digital en un solo lugar.

## Descripción

Esta web funciona como perfil personal y hub de contacto para Xavii JR Jaramillo. Su objetivo es centralizar enlaces importantes, presentar una identidad visual moderna y ofrecer una experiencia interactiva con diseño responsive y animaciones sutiles.

La página incluye:

- Carrusel visual con diseño tipo "glassmorphism"
- Lista de redes sociales con enlaces directos
- Sección de proyectos destacados
- Botón para cambiar tema claro/oscuro
- Botón para compartir o copiar el enlace del perfil
- Estadísticas locales guardadas en el navegador
- Partículas animadas de fondo y efectos de brillo

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript vanilla

## Estructura del proyecto

```text
.
├── app.js
├── index.html
├── styles.css
├── assets/
│   └── favicon.svg
├── README.md
└── ...
```

## Cómo ejecutar el proyecto

### Opción 1: abrir directamente

Simplemente abre el archivo `index.html` en tu navegador.

### Opción 2: servidor local

Si prefieres servirlo localmente, puedes ejecutar:

```bash
python -m http.server 8000
```

Luego abre en el navegador:

```text
http://localhost:8000
```

## Personalización

Puedes modificar fácilmente:

- Los enlaces de las redes sociales en `app.js`
- Los proyectos destacados en el arreglo `PROJECTS`
- Los colores y estilos en `styles.css`
- El texto principal y la información del perfil en `index.html`

## Nota

Las estadísticas de clics se guardan en el navegador del usuario mediante `localStorage` y no representan datos globales ni tráfico real de la web.

## Autor

Xavii JR Jaramillo
