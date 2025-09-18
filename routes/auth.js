import express from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import { validate, registerSchema, loginSchema, updateProfileSchema } from '../middleware/validation.js';

const router = express.Router();


router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

router.get('/me', authenticateToken, getProfile);
router.put('/me', authenticateToken, validate(updateProfileSchema), updateProfile);

export default router;
