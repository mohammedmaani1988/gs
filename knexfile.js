if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./config.env" });
}

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB
    },
    typeCast: function (field, next) {
      if (field.type == "JSON") {
        return JSON.parse(field.string());
      }
      return next();
    },
    migrations: {
      directory: "./src/db/migrations"
    },
    seeds: {
      directory: "./src/db/seeds"
    }
  },
  production: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    typeCast: function (field, next) {
      if (field.type == "JSON") {
        return JSON.parse(field.string());
      }
      return next();
    },
    migrations: {
      directory: "./src/db/migrations"
    },
    seeds: {
      directory: "./src/db/seeds"
    }
  }
};
