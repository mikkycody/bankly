require("dotenv").config();

export default {
  app: {
    port: process.env.PORT || 4000,
  },
  database: {
    url: process.env.DATABASE_URL || "mongodb://localhost",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "secret",
    access_token_expiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION || 3600,
    refresh_token_expiration:
      process.env.JWT_REFRESH_TOKEN_EXPIRATION || 259200,
  },
};
