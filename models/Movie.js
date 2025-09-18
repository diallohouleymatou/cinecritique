import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    comment: 'TMDb movie ID'
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: true
  },
  releaseDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  genres: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: []
  },
  runtime: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  overview: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  cachedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'movies',
  timestamps: false
});

// Method to check if cache is still valid (24 hours)
Movie.prototype.isCacheValid = function() {
  const cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours in ms
  return (Date.now() - this.cachedAt.getTime()) < cacheExpiry;
};

export default Movie;
