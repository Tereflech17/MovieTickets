const config = {
  "dev": {
    "host": process.env.HOSTNAME,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DATABASE
  },

  "prod": {
    "host": '',
    "username": '',
    "password": '',
    "database": '',
  }
}

module.exports = config;