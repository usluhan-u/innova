import dotenv from 'dotenv';
import MeiliSearch from 'meilisearch';
import { Payload } from 'payload';

dotenv.config();

export const meilisearch = async (payload: Payload) => {
  try {
    const client = new MeiliSearch({
      host: process.env.MEILISEARCH_SERVER_URL || '',
      apiKey: process.env.NEXT_PUBLIC_MEILISEARCH_MASTER_KEY || ''
    });

    const pagesIndex = client.index('pages');
    const blogsIndex = client.index('blogs');
    const postsIndex = client.index('posts');

    pagesIndex.updateFilterableAttributes(['_status']);
    blogsIndex.updateFilterableAttributes(['_status']);
    postsIndex.updateFilterableAttributes(['_status']);

    const { docs: pageDocs } = await payload.find({
      collection: 'pages',
      limit: 1000000
    });

    const { docs: trBlogDocs } = await payload.find({
      collection: 'tr-blogs',
      limit: 1000000
    });

    const { docs: enBlogDocs } = await payload.find({
      collection: 'en-blogs',
      limit: 1000000
    });

    const { docs: postDocs } = await payload.find({
      collection: 'posts',
      limit: 1000000
    });

    await pagesIndex.addDocuments([...pageDocs]);
    await blogsIndex.addDocuments([...trBlogDocs, ...enBlogDocs]);
    await postsIndex.addDocuments([...postDocs]);
  } catch (error) {
    payload.logger.error(error);
  }
};
