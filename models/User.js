import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import bcrypt from 'bcrypt';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pseudo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  photo: {
    type: DataTypes.STRING,
    defaultValue: "https://res.cloudinary.com/dl5jlcbo3/image/upload/v1/default_profile"
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users',
  timestamps: true,
  updatedAt: false
});

// Hash password before saving
User.beforeCreate(async (user) => {
  if (user.passwordHash) {
    user.passwordHash = await bcrypt.hash(user.passwordHash, 12);
  }
});

User.beforeUpdate(async (user) => {
  if (user.changed('passwordHash')) {
    user.passwordHash = await bcrypt.hash(user.passwordHash, 12);
  }
});

// Instance method to validate password
User.prototype.validatePassword = async function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

// Class method to find by email
User.findByEmail = function(email) {
  return this.findOne({ where: { email } });
};

export default User;
