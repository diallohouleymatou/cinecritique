import express from 'express';
import { getUserReviews } from '../controllers/reviewController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', optionalAuth, getUserReviews);

export default router;
