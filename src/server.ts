import express from 'express';
import payload from 'payload';
import next from 'next';
import nextBuild from 'next/dist/build';
import path from 'path';
import { env } from './env';

const DEV = process.env.NODE_ENV !== 'production';
const PORT = env.port;

const app = express();

const boilerplate = async () => {
  await payload.init({
    secret: env.payloadSecretKey,
    mongoURL: env.db,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}!`);
      payload.logger.info(`Payload API URL: ${payload.getAPIURL()}!`);
    }
  });

  if (!process.env.NEXT_BUILD) {
    const nextApp = next({ dev: DEV });
    const nextHandler = nextApp.getRequestHandler();

    app.get('*', (req, res) => nextHandler(req, res));

    nextApp.prepare().then(() => {
      payload.logger.info(`Client is ready!`);

      app.listen(PORT, async () => {
        payload.logger.info(`Server is listening on port ${PORT}}!`);
      });
    });
  } else {
    app.listen(PORT, async () => {
      payload.logger.info('Client is building now...');

      await nextBuild(path.join(__dirname, '../'));

      process.exit();
    });
  }
};

boilerplate();
