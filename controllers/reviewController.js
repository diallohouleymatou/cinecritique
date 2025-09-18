import { Review, User, Movie } from '../models/index.js';
import TMDbAPI from '../utils/api.js';
import { successResponse, errorResponse, getPagination, getPaginationData } from '../utils/helpers.js';

export const createReview = async (req, res, next) => {
  try {
    const { filmId, rating, comment } = req.validatedData.body;
    const userId = req.user.id;

    // Vérifier si le film existe en base locale
    let movie = await Movie.findByPk(filmId);
    if (!movie) {
      // Récupérer les infos du film via TMDb
      const tmdbMovie = await TMDbAPI.getMovieDetails(filmId);
      if (!tmdbMovie) {
        throw errorResponse('Movie not found in TMDb', 404);
      }
      // Insérer le film en base locale
      movie = await Movie.create({
        id: tmdbMovie.id,
        title: tmdbMovie.title,
        poster: tmdbMovie.poster_path,
        releaseDate: tmdbMovie.release_date,
        genres: tmdbMovie.genres ? tmdbMovie.genres.map(g => g.name) : [],
        runtime: tmdbMovie.runtime,
        overview: tmdbMovie.overview
      });
    }

    // Vérifier si l'utilisateur a déjà laissé une review
    const existingReview = await Review.findOne({
      where: { userId, filmId }
    });
    if (existingReview) {
      throw errorResponse('You have already reviewed this movie', 409);
    }

    // Créer la review
    const review = await Review.create({
      userId,
      filmId,
      rating,
      comment
    });

    // Retourner la review avec les infos utilisateur
    const reviewWithUser = await Review.findByPk(review.id, {
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'pseudo', 'photo']
      }]
    });

    res.status(201).json(successResponse(reviewWithUser, 'Review created successfully'));
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.validatedData.body;
    const userId = req.user.id;

    const review = await Review.findOne({
      where: { id, userId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'pseudo', 'photo']
      }]
    });

    if (!review) {
      throw errorResponse('Review not found or unauthorized', 404);
    }

    await review.update({ rating, comment });

    res.json(successResponse(review, 'Review updated successfully'));

  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const review = await Review.findOne({
      where: { id, userId }
    });

    if (!review) {
      throw errorResponse('Review not found or unauthorized', 404);
    }

    await review.destroy();

    res.json(successResponse(null, 'Review deleted successfully'));

  } catch (error) {
    next(error);
  }
};

export const getMovieReviews = async (req, res, next) => {
  try {
    const { id: filmId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const { limit: queryLimit, offset } = getPagination(page, limit);

    const { count, rows } = await Review.findAndCountAll({
      where: { filmId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'pseudo', 'photo']
      }],
      order: [['createdAt', 'DESC']],
      limit: queryLimit,
      offset
    });

    const pagination = getPaginationData(count, page, limit);

    res.json(successResponse({
      reviews: rows,
      pagination
    }, 'Movie reviews retrieved'));

  } catch (error) {
    next(error);
  }
};

export const getUserReviews = async (req, res, next) => {
  try {
    const { id: targetUserId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const { limit: queryLimit, offset } = getPagination(page, limit);

    // Verify user exists
    const user = await User.findByPk(targetUserId, {
      attributes: ['id', 'pseudo', 'photo', 'bio']
    });

    if (!user) {
      throw errorResponse('User not found', 404);
    }

    const { count, rows } = await Review.findAndCountAll({
      where: { userId: targetUserId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'pseudo', 'photo']
      }],
      order: [['createdAt', 'DESC']],
      limit: queryLimit,
      offset
    });

    const pagination = getPaginationData(count, page, limit);

    res.json(successResponse({
      user,
      reviews: rows,
      pagination
    }, 'User reviews retrieved'));

  } catch (error) {
    next(error);
  }
};
