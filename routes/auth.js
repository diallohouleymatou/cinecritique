import express from 'express';
import { register, login, getProfile, updateProfile, updateProfileImage } from '../controllers/authController.js';
import { validate, registerSchema, loginSchema, updateProfileSchema } from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();


router.post('/register', upload.single('photo'), validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

router.get('/me', authenticateToken, getProfile);
router.put('/me', authenticateToken, validate(updateProfileSchema), updateProfile);
router.post('/me/image', authenticateToken, upload.single('image'), updateProfileImage);

export default router;
