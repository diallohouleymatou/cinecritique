import User from './User.js';
import Review from './Review.js';
import Movie from './Movie.js';

// Define associations
User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Optional: If using Movie cache
Movie.hasMany(Review, { foreignKey: 'filmId', as: 'reviews' });
Review.belongsTo(Movie, { foreignKey: 'filmId', as: 'movie' });

export { User, Review, Movie };
