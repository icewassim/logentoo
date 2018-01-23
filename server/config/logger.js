import winston from 'winston';

export const init = loggerDir => {
  winston.loggers.add('tech', {
    console: {
      level: 'info',
      colorize: true,
      prettyPrint: true,
      timestamp: true,
    },
    file: {
      filename: loggerDir,
    }
  });

  global.loggerT = winston.loggers.get('tech');
}
