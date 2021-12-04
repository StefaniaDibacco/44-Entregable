import { init } from './services/sockets';
import myServer from './services/server';
import { Server } from 'socket.io';
import Config from './config';
import args from 'args';
import cluster from 'cluster';
import os from 'os';
import { logger } from './utils/logger';
import 'dotenv/config.js';

const io = new Server(myServer);
init(io);

const numCPUs = os.cpus().length;
const flags = args.parse(process.argv);

if (flags.mode === 'cluster' && flags.run !== 'pm2' && cluster.isMaster) {
  logger.info(`NUMERO DE CPUS ===> ${numCPUs}`);
  logger.info(`PID MASTER ${process.pid}, ${new Date()}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    logger.warn(`Worker ${worker.process.pid} died at ${Date()}`);
    cluster.fork();
  });
} else {
  const puerto = Config.PORT;
  myServer.listen(puerto, () => {
    logger.info(
      `Servidor inicializado en http://localhost:${puerto} - PID WORKER ${process.pid}`
    );
  });
  myServer.on('error', (error) =>
    logger.error(`Error en el servidor: ${error}`)
  );
}
