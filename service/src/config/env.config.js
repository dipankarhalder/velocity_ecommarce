const dotenv = require('dotenv');
dotenv.config({ quiet: true });

const env = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  PLATFORM: process.env.PLATFORM,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
  NODE_ENV: process.env.NODE_ENV,
};

module.exports = env;
