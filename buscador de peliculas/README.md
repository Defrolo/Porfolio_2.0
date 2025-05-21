# Buscador de Películas

Una aplicación web que permite buscar información sobre películas utilizando la API de OMDB (Open Movie Database).

## Características

- Búsqueda de películas por título
- Visualización de resultados con póster, título y año
- Vista detallada con información completa de la película seleccionada
- Diseño responsivo adaptado a dispositivos móviles y de escritorio

## Tecnologías utilizadas

- HTML5
- CSS3 (con Flexbox y Grid para layouts)
- JavaScript (ES6+)
- Fetch API para realizar peticiones HTTP
- Font Awesome para iconos

## Cómo usar

1. Abre el archivo `index.html` en tu navegador
2. Ingresa el título de una película en el campo de búsqueda
3. Haz clic en el botón de búsqueda o presiona Enter
4. Explora los resultados y haz clic en cualquier película para ver más detalles

## Obtener una API Key

Para que la aplicación funcione correctamente, necesitas obtener tu propia API key de OMDB:

1. Visita [http://www.omdbapi.com/](http://www.omdbapi.com/)
2. Haz clic en "API Key"
3. Completa el formulario para solicitar una clave gratuita
4. Recibirás un correo electrónico con tu API key
5. Reemplaza el valor de `API_KEY` en el archivo `script.js` con tu propia clave

```javascript
const API_KEY = "TU_API_KEY_AQUÍ"; // Reemplaza con tu propia API key
```

## Limitaciones

La versión gratuita de la API de OMDB tiene un límite de 1,000 solicitudes diarias.

## Mejoras futuras

- Añadir paginación para mostrar más resultados
- Implementar filtros por año, género, etc.
- Añadir sección de películas populares o recomendadas
- Guardar películas favoritas en almacenamiento local
