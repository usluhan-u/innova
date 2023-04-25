/* eslint-disable @typescript-eslint/no-explicit-any */
const formatPagePath = (collection: string, doc: any): string => {
  const { slug } = doc;

  let prefix = '';

  if (collection) {
    switch (collection) {
      case 'pages':
        prefix = '';
        break;
      case 'blog-posts':
        prefix = '/blog';
        break;
      default:
        prefix = `/${collection}`;
    }
  }

  return `${prefix}/${slug}`;
};

export const regeneratePage = async ({
  doc,
  collection
}: {
  doc: any;
  collection: string;
}): Promise<void> => {
  formatPagePath(collection, doc);
};
