import { tmdbClient } from '../config/tmdb.js';

class TMDbAPI {
  static async searchMovies(query, page = 1) {
    try {
      const response = await tmdbClient.get('/search/movie', {
        params: { query, page }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to search movies from TMDb');
    }
  }

  static async getMovieDetails(movieId) {
    try {
      const response = await tmdbClient.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Movie not found');
      }
      throw new Error('Failed to fetch movie details from TMDb');
    }
  }

  static async getPopularMovies(page = 1) {
    try {
      const response = await tmdbClient.get('/movie/popular', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch popular movies from TMDb');
    }
  }

  static async getMovieCredits(movieId) {
    try {
      const response = await tmdbClient.get(`/movie/${movieId}/credits`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch movie credits from TMDb');
    }
  }

  static formatMovieData(tmdbMovie) {
    return {
      id: tmdbMovie.id.toString(),
      title: tmdbMovie.title,
      poster: tmdbMovie.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}` : null,
      releaseDate: tmdbMovie.release_date ? new Date(tmdbMovie.release_date) : null,
      genres: tmdbMovie.genres ? tmdbMovie.genres.map(g => g.name) : [],
      runtime: tmdbMovie.runtime || null,
      overview: tmdbMovie.overview || null
    };
  }
}

export default TMDbAPI;
