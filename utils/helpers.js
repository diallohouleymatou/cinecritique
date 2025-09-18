import jwt from 'jsonwebtoken';

// Generate JWT token
export const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// Calculate average rating for a film
export const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10; // Round to 1 decimal
};

// Pagination helper
export const getPagination = (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return { limit, offset };
};

// Format pagination response
export const getPaginationData = (count, page, limit) => {
  const totalPages = Math.ceil(count / limit);
  return {
    totalItems: count,
    totalPages,
    currentPage: page,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1
  };
};

// Error response helper
export const errorResponse = (message, status = 500, details = null) => {
  const error = new Error(message);
  error.status = status;
  if (details) error.details = details;
  return error;
};

// Success response helper
export const successResponse = (data, message = 'Success', meta = null) => {
  const response = { success: true, message, data };
  if (meta) response.meta = meta;
  return response;
};

// Validate environment variables
export const validateEnvironment = () => {
  const required = [
    'JWT_SECRET',
    'DB_NAME',
    'DB_USERNAME',
    'DB_PASSWORD',
    'TMDB_API_KEY'
  ];

  const missing = required.filter(key => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};
