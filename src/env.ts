import { config } from 'dotenv';

const result = config();

if (result.error) {
  throw result.error;
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  db: process.env.MONGODB_URI || '',
  payloadSecretKey: process.env.PAYLOAD_SECRET_KEY || '',
  port: parseInt(process.env.PORT || '3000', 10),
  nextPublicServerUrl: process.env.NEXT_PUBLIC_SERVER_URL || '',
  payloadPublicServerUrl: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  nextPublicMeiliSearchUrl:
    process.env.NEXT_PUBLIC_MEILISEARCH_URL || 'http://localhost:7700'
} as const;
