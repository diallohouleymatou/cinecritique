import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

if (!TMDB_API_KEY && !TMDB_ACCESS_TOKEN) {
  throw new Error('TMDB_API_KEY or TMDB_ACCESS_TOKEN environment variable is required');
}

// Client avec token Bearer (recommandé)
const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  },
  params: {
    language: 'fr-FR'
  },
  timeout: 10000
});

// Client avec API Key (fallback)
const tmdbClientApiKey = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'fr-FR'
  },
  timeout: 10000
});

// Fonction de test de l'API
export const testTMDBConnection = async () => {
  try {
    console.log('🧪 Test de la connexion TMDB...');

    // Test avec Bearer token
    const response = await tmdbClient.get('/configuration');
    console.log('✅ Connexion TMDB réussie avec Bearer token');
    console.log('📊 Configuration TMDB:', {
      baseURL: response.data.images.base_url,
      posterSizes: response.data.images.poster_sizes,
      backdropSizes: response.data.images.backdrop_sizes
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Erreur de connexion TMDB:', error.response?.data || error.message);
    return { success: false, error: error.message };
  }
};

// Fonction de test de recherche de film
export const testMovieSearch = async (query = 'Avatar') => {
  try {
    console.log(`🔍 Test de recherche de film: "${query}"`);

    const response = await tmdbClient.get('/search/movie', {
      params: { query }
    });

    const movies = response.data.results.slice(0, 3);
    console.log('✅ Recherche réussie');
    console.log('🎬 Films trouvés:', movies.map(movie => ({
      id: movie.id,
      title: movie.title,
      releaseDate: movie.release_date,
      rating: movie.vote_average
    })));

    return { success: true, data: movies };
  } catch (error) {
    console.error('❌ Erreur de recherche:', error.response?.data || error.message);
    return { success: false, error: error.message };
  }
};

// Fonction de test de détails d'un film
export const testMovieDetails = async (movieId = 550) => {
  try {
    console.log(`🎭 Test de détails du film ID: ${movieId}`);

    const response = await tmdbClient.get(`/movie/${movieId}`);

    console.log('✅ Détails récupérés');
    console.log('🎬 Film:', {
      id: response.data.id,
      title: response.data.title,
      overview: response.data.overview?.substring(0, 100) + '...',
      releaseDate: response.data.release_date,
      rating: response.data.vote_average,
      genres: response.data.genres?.map(g => g.name)
    });

    return { success: true, data: response.data };
  } catch (error) {
    console.error('❌ Erreur de récupération des détails:', error.response?.data || error.message);
    return { success: false, error: error.message };
  }
};

export { tmdbClient, tmdbClientApiKey, TMDB_BASE_URL, TMDB_API_KEY, TMDB_ACCESS_TOKEN };
