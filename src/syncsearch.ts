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
    mongoURL: process.env.MONGODB_URI || '',
    local: true,
    onInit: async () => {
      try {
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
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  });
};

sync();
