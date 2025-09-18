import express from 'express';
import { searchMovies, getPopularMovies, getMovieDetails, getTopRatedMovies } from '../controllers/movieController.js';
import { optionalAuth } from '../middleware/auth.js';
import { validate, paginationSchema } from '../middleware/validation.js';

const router = express.Router();

router.get('/search', optionalAuth, searchMovies);
router.get('/popular', optionalAuth, getPopularMovies);
router.get('/top-rated', optionalAuth, validate(paginationSchema), getTopRatedMovies);
router.get('/:id', optionalAuth, getMovieDetails);

export default router;
