import TMDbAPI from '../utils/api.js';
import { Movie, Review, User } from '../models/index.js';
import { successResponse, errorResponse, calculateAverageRating, getPagination, getPaginationData } from '../utils/helpers.js';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.js';

export const searchMovies = async (req, res, next) => {
  try {
    const { q: query, page = 1 } = req.query;

    if (!query) {
      throw errorResponse('Search query is required', 400);
    }

    const tmdbData = await TMDbAPI.searchMovies(query, page);

    res.json(successResponse(tmdbData, 'Movies search completed'));
  } catch (error) {
    next(error);
  }
};

export const getPopularMovies = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;

    const tmdbData = await TMDbAPI.getPopularMovies(page);

    res.json(successResponse(tmdbData, 'Popular movies retrieved'));
  } catch (error) {
    next(error);
  }
};

export const getMovieDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check cache first
    let movie = await Movie.findByPk(id);

    if (!movie || !movie.isCacheValid()) {
      // Fetch from TMDb
      const tmdbMovie = await TMDbAPI.getMovieDetails(id);
      const formattedMovie = TMDbAPI.formatMovieData(tmdbMovie);

      // Update or create cache
      if (movie) {
        await movie.update(formattedMovie);
      } else {
        movie = await Movie.create(formattedMovie);
      }
    }

    // Get reviews and ratings
    const reviews = await Review.findAll({
      where: { filmId: id },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'pseudo', 'photo']
      }],
      order: [['createdAt', 'DESC']]
    });

    const averageRating = calculateAverageRating(reviews);
    const totalReviews = reviews.length;

    res.json(successResponse({
      movie: movie.toJSON(),
      averageRating,
      totalReviews,
      reviews
    }, 'Movie details retrieved'));

  } catch (error) {
    next(error);
  }
};

export const getTopRatedMovies = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, sort = 'avg' } = req.validatedData.query;
    const { limit: queryLimit, offset } = getPagination(page, limit);

    let orderBy;
    switch (sort) {
      case 'count':
        orderBy = [['reviewCount', 'DESC']];
        break;
      case 'recent':
        orderBy = [['latestReview', 'DESC']];
        break;
      default: // 'avg'
        orderBy = [['averageRating', 'DESC']];
    }

    // Get movies with their review statistics
    const { count, rows } = await Movie.findAndCountAll({
      attributes: [
        'id',
        'title',
        'poster',
        'releaseDate',
        [sequelize.fn('AVG', sequelize.col('reviews.rating')), 'averageRating'],
        [sequelize.fn('COUNT', sequelize.col('reviews.id')), 'reviewCount'],
        [sequelize.fn('MAX', sequelize.col('reviews.createdAt')), 'latestReview']
      ],
      include: [{
        model: Review,
        as: 'reviews',
        attributes: []
      }],
      group: ['Movie.id'],
      having: sequelize.where(sequelize.fn('COUNT', sequelize.col('reviews.id')), '>', 0),
      order: orderBy,
      limit: queryLimit,
      offset,
      subQuery: false
    });

    const pagination = getPaginationData(count, page, limit);

    res.json(successResponse({
      movies: rows,
      pagination
    }, 'Top rated movies retrieved'));

  } catch (error) {
    next(error);
  }
};
