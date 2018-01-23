const config = {
    NAME: 'API',
    VERSION: '0.0.1',
    db: {
      URI: 'mongodb://127.0.0.1:27017/crowler',
    },
    logger: {
      LOG_DIR: process.env.LOGGER_DIR_PATH || './logs/Techlogs.txt',
    },
    server: {
      base_url: process.env.BASE_URL || 'http://localhost:3000',
      ENV: process.env.NODE_ENV || 'development',
      PORT: process.env.PORT || 3000,
    }
}

export default config;
