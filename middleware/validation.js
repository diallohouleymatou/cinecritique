import { z } from 'zod';

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const validatedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params
      });

      req.validatedData = validatedData;
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: {
            message: 'Validation failed',
            details: error.errors.map(err => ({
              field: err.path.join('.'),
              message: err.message
            }))
          }
        });
      }
      next(error);
    }
  };
};

// Validation schemas
const registerSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    pseudo: z.string().min(3, 'Pseudo must be at least 3 characters').max(50, 'Pseudo too long'),
    bio: z.string().optional(),
    photo: z.string().url().optional()
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required')
  })
});

const reviewSchema = z.object({
  body: z.object({
    filmId: z.string().min(1, 'Film ID is required'),
    rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
    comment: z.string().min(10, 'Comment must be at least 10 characters').max(2000, 'Comment too long')
  })
});

const updateProfileSchema = z.object({
  body: z.object({
    pseudo: z.string().min(3).max(50).optional(),
    bio: z.string().optional(),
    photo: z.string().url().optional()
  })
});

const paginationSchema = z.object({
  query: z.object({
    page: z.string().transform(val => parseInt(val) || 1).pipe(z.number().min(1)).optional(),
    limit: z.string().transform(val => parseInt(val) || 10).pipe(z.number().min(1).max(100)).optional(),
    sort: z.enum(['avg', 'count', 'recent']).optional()
  })
});

export {
  validate,
  registerSchema,
  loginSchema,
  reviewSchema,
  updateProfileSchema,
  paginationSchema
};
