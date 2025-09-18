import express from 'express';
import { createReview, updateReview, deleteReview, getMovieReviews, getUserReviews } from '../controllers/reviewController.js';
import { authenticateToken, optionalAuth } from '../middleware/auth.js';
import { validate, reviewSchema } from '../middleware/validation.js';

const router = express.Router();

router.post('/', authenticateToken, validate(reviewSchema), createReview);
router.put('/:id', authenticateToken, validate(reviewSchema), updateReview);
router.delete('/:id', authenticateToken, deleteReview);
router.get('/movie/:id', optionalAuth, getMovieReviews);
router.get('/user/:id', optionalAuth, getUserReviews);

export default router;
