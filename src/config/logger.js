const winston = require('winston');
const cluster = require('cluster');

const { format, transports } = winston;
const config = require('./config');

let workerId;

function getWorkerId() {
  if (cluster.isMaster) {
    workerId = `Master: ${process.pid}`;
  } else if (cluster.isWorker) {
    workerId = `Worker${cluster.worker.id}: ${process.pid}`;
  }
}
// fetch worker id
getWorkerId();

const isDevEnv = ['development', 'test', 'uat'].includes(config.env);
const logger = (moduleName) =>
  winston.createLogger({
    level: isDevEnv ? 'debug' : 'info',
    format: winston.format.combine(
      winston.format.json(),
      winston.format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'stack'] }),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss:SSS',
      }),
      winston.format.printf((info) => {
        const { timestamp, message, stack, metadata, ...data } = info;
        const ts = config.isClusterEnabled ? `${workerId}` : ``;
        if (!isDevEnv) {
          const timestamps = config.isClusterEnabled ? `${workerId}: ${timestamp} ${rid}` : `${timestamp} ${rid}`;
          return `${timestamps}: [${moduleName}]: [${data.level}]:${message} ${
            Object.keys(data).length ? JSON.stringify(data, null, 0) : ''
          }`;
        } else {
          return JSON.stringify({
            timestamp,
            message,
            metadata,
            level: data.level,
            source: 'KoreAgentAssist',
            moduleName,
            worker: ts,
            stack,
          });
        }
      })
    ),
    transports: [
      new transports.Console({
        format: format.combine(),
      }),
    ],
  });

module.exports = logger;
