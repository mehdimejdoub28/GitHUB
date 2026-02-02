// Movie data array

];

// DOM Elements
const moviesList = document.getElementById('moviesList');
const searchInput = document.getElementById('searchInput');
const ratingFilter = document.getElementById('ratingFilter');
const movieDetails = document.getElementById('movieDetails');

// Function to create movie card
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.dataset.id = movie.id;
    
    // First letter of movie title for poster
    const firstLetter = movie.title.charAt(0);
    
    card.innerHTML = `
        <div class="movie-poster">${firstLetter}</div>
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <p class="movie-year">${movie.year}</p>
            <p class="movie-rating">⭐ ${movie.rating}/10</p>
        </div>
    `;
    
    return card;
}

// Function to display movie details
function showMovieDetails(movie) {
    movieDetails.innerHTML = `
        <div class="details-content">
            <h3>${movie.title} (${movie.year})</h3>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p><strong>Rating:</strong> ⭐ ${movie.rating}/10</p>
            <p><strong>Genre:</strong> ${movie.genre}</p>
            <p><strong>Duration:</strong> ${movie.duration}</p>
            <p><strong>Description:</strong> ${movie.description}</p>
        </div>
    `;
}

// Function to load and display movies
function loadMovies(moviesArray) {
    // Clear current movies
    moviesList.innerHTML = '';
    
    // Create and append movie cards
    moviesArray.forEach(movie => {
        const card = createMovieCard(movie);
        moviesList.appendChild(card);
        
        // Add click event to show details
        card.addEventListener('click', () => {
            showMovieDetails(movie);
            
            // Highlight selected card
            document.querySelectorAll('.movie-card').forEach(c => {
                c.style.border = 'none';
            });
            card.style.border = '3px solid #3498db';
        });
    });
    
    // If no movies found
    if (moviesArray.length === 0) {
        moviesList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No movies found. Try a different search.</p>';
    }
}

// Function to filter movies
function filterMovies() {
    const searchTerm = searchInput.value.toLowerCase();
    const minRating = parseFloat(ratingFilter.value);
    
    const filteredMovies = movies.filter(movie => {
        // Check if movie title includes search term
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
        
        // Check if movie rating is above minRating
        const matchesRating = movie.rating >= minRating;
        
        return matchesSearch && matchesRating;
    });
    
    loadMovies(filteredMovies);
}

// Event Listeners
searchInput.addEventListener('input', filterMovies);
ratingFilter.addEventListener('change', filterMovies);


document.addEventListener('DOMContentLoaded', () => {
    loadMovies(movies);
    
    if (movies.length > 0) {
        showMovieDetails(movies[0]);
        
        // Highlight first movie card
        const firstCard = document.querySelector('.movie-card');
        if (firstCard) {
            firstCard.style.border = '3px solid #3498db';
        }
    }
});