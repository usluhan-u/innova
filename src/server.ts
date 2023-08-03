import path from 'path';
import { IncomingMessage, ServerResponse } from 'http';
import express from 'express';
import payload from 'payload';
import next from 'next';
import nextBuild from 'next/dist/build';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { MeiliSearch } from 'meilisearch';
import { seed } from './seed';

dotenv.config();

const DEV = process.env.NODE_ENV !== 'production';
const PORT = parseInt(process.env.PORT || '3000', 10);

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

  const client = new MeiliSearch({
    host: process.env.NEXT_PUBLIC_MEILISEARCH_URL || 'http://localhost:7700',
    apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_MASTER_KEY || ''
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

  const pagesIndex = client.index('pages');
  const blogsIndex = client.index('blogs');
  const postsIndex = client.index('posts');

  const { docs: pageDocs } = await payload.find({
    collection: 'pages'
  });

  const { docs: trBlogDocs } = await payload.find({
    collection: 'tr-blogs'
  });

  const { docs: enBlogDocs } = await payload.find({
    collection: 'en-blogs'
  });

  const { docs: postDocs } = await payload.find({
    collection: 'posts'
  });

  await pagesIndex.addDocuments(pageDocs);
  await blogsIndex.addDocuments([...trBlogDocs, ...enBlogDocs]);
  await postsIndex.addDocuments(postDocs);

  if (process.env.DB_SEED === 'true') {
    payload.logger.info('Seeding database...');
    await seed(payload);
    payload.logger.info('Database seeded!');
  }

  if (!process.env.NEXT_BUILD) {
    const nextApp = next({ dev: DEV });
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
