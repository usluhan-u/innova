import path from 'path';
import { IncomingMessage, ServerResponse } from 'http';
import express from 'express';
import payload from 'payload';
import next from 'next';
import nextBuild from 'next/dist/build';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { seed } from './seed';

dotenv.config();

const DEV = process.env.NODE_ENV !== 'production';
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOSTNAME = process.env.HOSTNAME || 'localhost';

const app = express();

const boilerplate = async () => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '25', 10),
    secure: false,
    tls: {
      rejectUnauthorized: false
    }
  });

  await payload.init({
    secret: process.env.PAYLOAD_SECRET_KEY || '',
    mongoURL: process.env.MONGODB_URI || '',
    express: app,
    email: {
      fromName: 'Innova',
      fromAddress: process.env.EMAIL_SENDER || '',
      transport
    },
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
      payload.logger.info(`Payload API URL: ${payload.getAPIURL()}`);
    }
  });

  if (process.env.DB_SEED === 'true') {
    payload.logger.info('Seeding database...');
    await seed(payload);
    payload.logger.info('Database seeded!');
  }

  if (!process.env.NEXT_BUILD) {
    const nextApp = next({
      dev: DEV,
      hostname: HOSTNAME,
      port: PORT
    });
    const nextHandler = nextApp.getRequestHandler();

    app.get(
      '*',
      (request: IncomingMessage, response: ServerResponse<IncomingMessage>) =>
        nextHandler(request, response)
    );

    nextApp.prepare().then(() => {
      payload.logger.info(`Client is ready!`);

      app.listen(PORT, async () => {
        payload.logger.info(`Server is listening on port ${PORT}.`);
      });
    });
  } else {
    app.listen(PORT, async () => {
      payload.logger.info('Client is building now...');

      await nextBuild(
        path.join(__dirname, '../'),
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        'default'
      );

      process.exit();
    });
  }
};

boilerplate();
