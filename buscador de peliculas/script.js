// API Key para OMDB API
const API_KEY = "fb382eae"; // You'll need to get your own API key at http://www.omdbapi.com/

// Elementos del DOM
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results-container");
const loadingElement = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");

// Event Listeners
searchForm.addEventListener("submit", handleSearch);

// Función para manejar la búsqueda
async function handleSearch(e) {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();

  if (!searchTerm) return;

  console.log("Iniciando búsqueda para:", searchTerm);

  // Mostrar loading y ocultar otros elementos
  showLoading();
  // Limpiar resultados anteriores y errores
  resultsContainer.innerHTML = "";
  errorMessage.classList.add("hidden");

  try {
    const movies = await searchMovies(searchTerm);
    console.log("Películas encontradas:", movies.length);
    displayResults(movies);
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    showError(error.message);
  } finally {
    hideLoading();
  }
}

// Función para buscar películas en la API
async function searchMovies(searchTerm) {
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(
    searchTerm
  )}&apikey=${API_KEY}`;

  console.log("Buscando películas con URL:", url);

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log("Respuesta de la API:", data);

    if (data.Response === "False") {
      throw new Error(data.Error || "No se encontraron resultados");
    }

    return data.Search;
  } catch (error) {
    console.error("Error al buscar películas:", error);
    throw error;
  }
}

// Función para mostrar los resultados de la búsqueda
function displayResults(movies) {
  // Limpiar resultados anteriores
  resultsContainer.innerHTML = "";

  // Asegurar que el contenedor de resultados sea visible
  resultsContainer.classList.remove("hidden");

  console.log("Mostrando", movies.length, "películas en los resultados");

  // Crear tarjeta para cada película
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    // Usar imagen de placeholder si no hay póster
    const posterUrl =
      movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/300x450?text=No+Poster";

    movieCard.innerHTML = `
            <img class="movie-poster" src="${posterUrl}" alt="${movie.Title}">
            <div class="movie-info">
                <h3 class="movie-title">${movie.Title}</h3>
                <p class="movie-year">${movie.Year}</p>
            </div>
        `;

    // Añadir evento click para ver detalles
    movieCard.addEventListener("click", () => {
      console.log("Película seleccionada:", movie.Title, "ID:", movie.imdbID);
      getMovieDetails(movie.imdbID);
    });

    // Añadir clase para indicar que es clickeable
    movieCard.style.cursor = "pointer";

    resultsContainer.appendChild(movieCard);
  });
}

// Función para redirigir a la página de detalles
function getMovieDetails(imdbID) {
  console.log("Redirigiendo a la página de detalles para ID:", imdbID);

  // Guardar el ID de la película en localStorage
  localStorage.setItem("selectedMovieId", imdbID);

  // Redirigir a la página de detalles
  window.location.href = "detalles.html";
}

// La función displayMovieDetails ya no es necesaria porque ahora mostramos los detalles en otra página

// Funciones de utilidad para mostrar/ocultar elementos
function showLoading() {
  loadingElement.classList.remove("hidden");
  errorMessage.classList.add("hidden");
  resultsContainer.classList.add("hidden");
}

function hideLoading() {
  loadingElement.classList.add("hidden");
  resultsContainer.classList.remove("hidden");
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  resultsContainer.innerHTML = "";
  // Mostrar el mensaje de error en la consola para depuración
  console.error("Error:", message);
}
