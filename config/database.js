import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // obligatoire sur Render Free
        },
      },
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
    })
    : new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME || 'cinecritique',
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || '',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });

// Test de connexion au démarrage
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err);
  }
})();

export { sequelize };
