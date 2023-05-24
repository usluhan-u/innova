import { Payload } from 'payload';
import { postGroups } from './post-group';

const seedPostGroups = async (payload: Payload) => {
  postGroups.forEach(async (postGroup) => {
    const postGroupSlugInEn = postGroup.slug.en;
    const postGroupSlugInTr = postGroup.slug.tr;
    const postGroupNameInEn = postGroup.name.en;
    const postGroupNameInTr = postGroup.name.tr;

    const resultInTr = await payload.find({
      collection: 'post-groups',
      where: {
        slug: { equals: postGroupSlugInTr }
      },
      locale: 'tr'
    });

    if (resultInTr.totalDocs === 0) {
      await payload.create({
        collection: 'post-groups',
        data: {
          slug: postGroupSlugInTr,
          name: postGroupNameInTr
        },
        locale: 'tr'
      });
    } else {
      await payload.update({
        collection: 'post-groups',
        id: resultInTr.docs[0].id,
        data: {
          slug: postGroupSlugInTr,
          name: postGroupNameInTr
        },
        locale: 'tr'
      });
    }

    const resultInEn = await payload.find({
      collection: 'post-groups',
      where: {
        slug: { equals: postGroupSlugInEn }
      },
      locale: 'en'
    });

    if (resultInEn.totalDocs === 0) {
      await payload.update({
        collection: 'post-groups',
        id: resultInTr.docs[0].id,
        data: {
          slug: postGroupSlugInEn,
          name: postGroupNameInEn
        },
        locale: 'en'
      });
    }
  });
};

export const seed = async (payload: Payload) => {
  await Promise.all([seedPostGroups(payload)]);
};
