const config = {
    NAME: 'API',
    VERSION: '0.0.1',
    db: {
      URI: process.env.DB_PATH || 'mongodb://127.0.0.1:27017/crowler',
    },
    logger: {
      LOG_DIR: process.env.LOGGER_DIR_PATH || './logs/Techlogs.txt',
    },
    server: {
      ENV: process.env.NODE_ENV || 'development',
      PORT: process.env.PORT || 3000,
    },
    MAX_RENT_QUERY_RESULT: 10,
}

export default config;
