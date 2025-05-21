// Elementos del DOM
const movieDetails = document.getElementById("movie-details");
const loadingElement = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");

// API Key para OMDB API
const API_KEY = "fb382eae";

// Cargar detalles de la película cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  // Obtener el ID de la película de localStorage
  const movieId = localStorage.getItem("selectedMovieId");

  if (!movieId) {
    showError(
      "No se encontró información de la película. Vuelve a la página principal."
    );
    return;
  }

  // Cargar los detalles de la película
  getMovieDetails(movieId);
});

// Función para obtener detalles de una película
async function getMovieDetails(imdbID) {
  showLoading();
  console.log("Obteniendo detalles para ID:", imdbID);

  try {
    const url = `https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${API_KEY}`;
    console.log("URL para detalles:", url);
    const response = await fetch(url);
    const movie = await response.json();
    console.log("Datos de película recibidos:", movie);

    if (movie.Response === "False") {
      throw new Error(movie.Error || "No se pudieron cargar los detalles");
    }

    displayMovieDetails(movie);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
}

// Función para mostrar los detalles de una película
function displayMovieDetails(movie) {
  // Asegurarse de que el contenedor de detalles esté visible
  movieDetails.classList.remove("hidden");
  console.log("Mostrando detalles de película:", movie.Title);

  // Usar imagen de placeholder si no hay póster
  const posterUrl =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  // Crear HTML para los detalles
  movieDetails.innerHTML = `
        <div class="detail-poster">
            <img src="${posterUrl}" alt="${movie.Title}">
        </div>
        <div class="detail-info">
            <h2 class="detail-title">${movie.Title}</h2>
            <div class="detail-meta">
                <span>${movie.Year}</span>
                <span>${
                  movie.Rated !== "N/A" ? movie.Rated : "Sin clasificación"
                }</span>
                <span>${
                  movie.Runtime !== "N/A"
                    ? movie.Runtime
                    : "Duración desconocida"
                }</span>
            </div>
            
            <div class="detail-section">
                <h3>Sinopsis</h3>
                <p class="detail-plot">${
                  movie.Plot !== "N/A"
                    ? movie.Plot
                    : "No hay sinopsis disponible"
                }</p>
            </div>
            
            ${
              movie.Director !== "N/A"
                ? `
                <div class="detail-section">
                    <h3>Director</h3>
                    <p>${movie.Director}</p>
                </div>
            `
                : ""
            }
            
            ${
              movie.Actors !== "N/A"
                ? `
                <div class="detail-section">
                    <h3>Reparto</h3>
                    <p>${movie.Actors}</p>
                </div>
            `
                : ""
            }
            
            ${
              movie.Genre !== "N/A"
                ? `
                <div class="detail-section">
                    <h3>Género</h3>
                    <p>${movie.Genre}</p>
                </div>
            `
                : ""
            }
            
            <button class="back-button" id="back-to-results">Volver a resultados</button>
        </div>
    `;

  // Añadir evento al botón de volver
  document.getElementById("back-to-results").addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// Funciones de utilidad para mostrar/ocultar elementos
function showLoading() {
  loadingElement.classList.remove("hidden");
  errorMessage.classList.add("hidden");
  movieDetails.classList.add("hidden");
}

function hideLoading() {
  loadingElement.classList.add("hidden");
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  movieDetails.classList.add("hidden");
  // Mostrar el mensaje de error en la consola para depuración
  console.error("Error:", message);

  // Añadir un botón para volver a la página principal
  errorMessage.innerHTML = `
    <p>${message}</p>
    <button class="back-button" onclick="window.location.href='index.html'">Volver a la página principal</button>
  `;
}
