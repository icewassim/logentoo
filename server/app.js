import _ from 'lodash';
import bunyan from 'bunyan';
import restify from 'restify';
import mongoose from 'mongoose';
import bunyanWinston from 'bunyan-winston-adapter';

import config from './config';
import * as logger from './config/logger';

logger.init(config.logger.LOG_DIR);

const server = restify.createServer({
  name: config.NAME,
  version: config.server.VERSION,
  log: bunyanWinston.createAdapter(loggerT),
});

server.use(restify.jsonBodyParser({ mapParams: true }));
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser({ mapParams: true }));
server.use(restify.fullResponse());

server.on('restifyError', (req, res, err) => {
  loggerT.error('error', err);
  res.send(err)
  return;
});

server.listen(config.server.PORT, serverErr => {
  if (serverErr) {
    loggerT.error('server connection Error', serverErr);
    return;
  }

  mongoose.connection.on('error', err => {
    loggerT.error('Mongoose default connection error: ', err);
    process.exit(1);
  })

  mongoose.connection.on('open', err => {
    if (err) {
      loggerT.error('Mongoose default connection error: ', err);
      process.exit(1);
    }

    const startMessage = _.template('ready to accept <%=name%> V:<%=version%> connection on port <%=port%> in <%=env%> environment');
    loggerT.info(startMessage({
      name: config.NAME,
      version: config.VERSION,
      port: config.server.PORT,
      env: config.server.ENV
    }));
     require('./routes')(server);
  });

  // TODO: why is out of open
  const db = mongoose.connect(config.db.URI);
});
