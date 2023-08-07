import dotenv from 'dotenv';
import payload from 'payload';
import { meilisearch } from './meilisearch';

dotenv.config();

const sync = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET_KEY || '',
    mongoURL: process.env.MONGODB_URI || '',
    local: true
  });

  await meilisearch(payload);

  payload.logger.info('Sync completed!');

  process.exit(0);
};

sync();
