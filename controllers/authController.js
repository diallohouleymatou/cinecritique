import { User } from '../models/index.js';
import { generateToken, errorResponse, successResponse } from '../utils/helpers.js';
import { Op } from 'sequelize';
import cloudinary from '../config/cloudinary.js';

export const register = async (req, res, next) => {
  try {
    const { email, password, pseudo, bio } = req.validatedData.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { pseudo }]
      }
    });

    if (existingUser) {
      const field = existingUser.email === email ? 'email' : 'pseudo';
      throw errorResponse(`User with this ${field} already exists`, 409);
    }

    // Upload photo if provided
    let photoUrl = "https://res.cloudinary.com/dl5jlcbo3/image/upload/v1/default_profile";
    if (req.file) {
      const buffer = req.file.buffer;
      const base64Image = buffer.toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'profile_images',
        transformation: [
          { width: 500, height: 500, crop: 'auto', gravity: 'auto' },
          { fetch_format: 'auto', quality: 'auto' }
        ]
      });
      photoUrl = result.secure_url;
    }

    // Create new user with photo
    const user = await User.create({
      email,
      passwordHash: password, // Will be hashed by the model hook
      pseudo,
      bio,
      photo: photoUrl
    });

    // Generate token
    const token = generateToken(user.id);

    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.passwordHash;

    res.status(201).json(successResponse({
      user: userResponse,
      token
    }, 'User registered successfully'));

  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.validatedData.body;

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      throw errorResponse('Invalid email or password', 401);
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw errorResponse('Invalid email or password', 401);
    }

    // Generate token
    const token = generateToken(user.id);

    // Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.passwordHash;

    res.json(successResponse({
      user: userResponse,
      token
    }, 'Login successful'));

  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const userResponse = req.user.toJSON();
    delete userResponse.passwordHash;

    res.json(successResponse(userResponse, 'Profile retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { pseudo, bio } = req.validatedData.body;
    const userId = req.user.id;

    // Check if pseudo is taken by another user
    if (pseudo) {
      const existingUser = await User.findOne({
        where: { pseudo, id: { [Op.ne]: userId } }
      });
      if (existingUser) {
        throw errorResponse('Pseudo already taken', 409);
      }
    }

    // Update user
    await req.user.update({
      ...(pseudo && { pseudo }),
      ...(bio !== undefined && { bio })
    });

    const userResponse = req.user.toJSON();
    delete userResponse.passwordHash;

    res.json(successResponse(userResponse, 'Profile updated successfully'));

  } catch (error) {
    next(error);
  }
};

export const updateProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw errorResponse('Aucune image n\'a été uploadée', 400);
    }

    const buffer = req.file.buffer;
    const base64Image = buffer.toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${base64Image}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'profile_images',
      transformation: [
        { width: 500, height: 500, crop: 'auto', gravity: 'auto' },
        { fetch_format: 'auto', quality: 'auto' }
      ]
    });

    const user = req.user;
    user.photo = result.secure_url;
    await user.save();

    res.json(successResponse({
      photo: result.secure_url
    }, 'Photo de profil mise à jour avec succès'));
  } catch (error) {
    next(error);
  }
};
