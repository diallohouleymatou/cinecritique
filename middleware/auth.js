import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: { message: 'Access token required' } });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ['passwordHash'] }
    });

    if (!user) {
      return res.status(401).json({ error: { message: 'Invalid token' } });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: { message: 'Invalid or expired token' } });
  }
};

const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.userId, {
        attributes: { exclude: ['passwordHash'] }
      });
      if (user) {
        req.user = user;
      }
    } catch (error) {
      // Silently fail for optional auth
    }
  }
  next();
};

export { authenticateToken, optionalAuth };
