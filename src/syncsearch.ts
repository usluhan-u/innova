import { MeiliSearch } from 'meilisearch';
import dotenv from 'dotenv';
import payload from 'payload';

dotenv.config();

const sync = async () => {
  const client = new MeiliSearch({
    host: process.env.NEXT_PUBLIC_MEILISEARCH_URL || 'http://localhost:7700',
    apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_MASTER_KEY || ''
  });

  await payload.init({
    secret: process.env.PAYLOAD_SECRET_KEY || '',
    mongoURL: process.env.MONGODB_URI || ''
  });

  const index = client.index('pages');

  const { docs } = await payload.find({
    collection: 'pages'
  });

  await index.addDocuments(docs);
};

sync();
