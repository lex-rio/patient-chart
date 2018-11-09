module.exports = {
  "development": {
    "dialect": "sqlite",
    "storage": "./db.development.sqlite"
  },
  "test": {
    "dialect": "sqlite",
    "storage": "./db.test.sqlite"
  },
  "staging": {
    "dialect": "sqlite",
    "storage": "./db.sqlite"
  },
  "production": {
    "use_env_variable": "DATABASE_URL"
  }
};
