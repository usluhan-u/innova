import { config } from 'dotenv';

const result = config();

if (result.error) {
  throw result.error;
}

export const env = {
  db: process.env.MONGODB_URI || '',
  payloadSecretKey: process.env.PAYLOAD_SECRET_KEY || '',
  port: parseInt(process.env.PORT || '3000', 10),
  nextPublicServerUrl: process.env.NEXT_PUBLIC_SERVER_URL || '',
  payloadPublicServerUrl: process.env.PAYLOAD_PUBLIC_SERVER_URL || ''
} as const;
