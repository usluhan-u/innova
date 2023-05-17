import { Payload } from 'payload';
import { postGroups } from './post-group';

export const seed = async (payload: Payload) => {
  await Promise.all(
    postGroups.map(async (postGroup) => {
      const result = await payload.find({
        collection: 'post-groups',
        where: {
          slug: { equals: postGroup.slug }
        }
      });

      if (result.totalDocs === 0) {
        await payload.create({
          collection: 'post-groups',
          data: postGroup
        });
      }
    })
  );
};
