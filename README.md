# CineCritique API

Backend API for CineCritique, a community movie review platform that integrates with TMDb API.

## Features

- **User Authentication**: Registration, login with JWT tokens
- **Movie Discovery**: Search and browse movies via TMDb API
- **Reviews System**: Create, update, delete movie reviews
- **Ratings & Rankings**: Calculate average ratings and top-rated movies
- **User Profiles**: Manage user profiles and view review history

## Tech Stack

- **Framework**: Express.js (Node.js)
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT with bcrypt password hashing
- **Validation**: Zod schema validation
- **External API**: The Movie Database (TMDb)
- **Logging**: Pino logger

## Project Structure

```
├── server.js              # Main application entry point
├── config/
│   ├── database.js         # Database connection configuration
│   └── tmdb.js            # TMDb API client configuration
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── movieController.js  # Movie-related operations
│   └── reviewController.js # Review CRUD operations
├── middleware/
│   ├── auth.js            # JWT authentication middleware
│   └── validation.js      # Request validation schemas
├── models/
│   ├── index.js           # Model associations
│   ├── User.js            # User model
│   ├── Review.js          # Review model
│   └── Movie.js           # Movie cache model
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── movies.js          # Movie routes
│   ├── reviews.js         # Review routes
│   └── users.js           # User routes
└── utils/
    ├── api.js             # TMDb API wrapper
    └── helpers.js         # Utility functions
```

## Setup Instructions

### 1. Environment Variables

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

Update the following variables in `.env`:

- `DB_*`: PostgreSQL database credentials
- `JWT_SECRET`: Strong secret key for JWT tokens
- `TMDB_API_KEY`: Your TMDb API key (get it from https://www.themoviedb.org/settings/api)

### 2. Database Setup

Create a PostgreSQL database and update the connection details in `.env`.

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/me` - Update user profile

### Movies
- `GET /api/movies/search?q={query}` - Search movies
- `GET /api/movies/popular` - Get popular movies
- `GET /api/movies/:id` - Get movie details
- `GET /api/movies/top-rated` - Get top-rated movies by community

### Reviews
- `POST /api/reviews` - Create a review
- `PUT /api/reviews/:id` - Update a review
- `DELETE /api/reviews/:id` - Delete a review
- `GET /api/reviews/movie/:id` - Get reviews for a movie
- `GET /api/reviews/user/:id` - Get reviews by a user

### Users
- `GET /api/users/:id` - Get user profile and reviews

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests
- `npm run migrate` - Run database migrations
- `npm run seed` - Run database seeders

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment mode | development |
| `DB_HOST` | Database host | localhost |
| `DB_PORT` | Database port | 5432 |
| `DB_NAME` | Database name | cinecritique |
| `DB_USERNAME` | Database username | postgres |
| `DB_PASSWORD` | Database password | - |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRES_IN` | JWT token expiration | 7d |
| `TMDB_API_KEY` | TMDb API key | - |

## Development

### Database Migrations

The application uses Sequelize ORM. In development mode, the database will auto-sync with model changes. For production, use proper migrations.

### Adding New Features

1. Create/update models in `models/`
2. Add business logic in `controllers/`
3. Define routes in `routes/`
4. Add validation schemas in `middleware/validation.js`
5. Update tests

## License

ISC
