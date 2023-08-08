import { GetServerSideProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { PageType, PostType } from '../collections';
import { getCustomPageDataByCondition } from '../api';

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const generateSitemap = ({
  pages,
  trBlogs,
  enBlogs,
  posts
}: {
  pages: PageType[];
  trBlogs: PostType[];
  enBlogs: PostType[];
  posts: PostType[];
}) =>
  `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${BASE_URL}</loc>
     </url>
     ${pages
       .map(
         ({ localizedSlugs }) => `
       ${
         localizedSlugs.tr
           ? `
          <url>
              <loc>${`${BASE_URL}/${localizedSlugs.tr}`}</loc>
          </url>
         `
           : null
       }
       ${
         localizedSlugs.en
           ? `
          <url>
              <loc>${`${BASE_URL}/en/${localizedSlugs.en}`}</loc>
          </url>
         `
           : null
       }
     `
       )
       .join('')}

      ${trBlogs
        .map(
          ({ localizedSlugs }) => `
      ${
        localizedSlugs.tr
          ? `
          <url>
              <loc>${`${BASE_URL}/blog/${localizedSlugs.tr}`}</loc>
          </url>
        `
          : ''
      }
      ${
        localizedSlugs.en
          ? `
          <url>
              <loc>${`${BASE_URL}/en/blog/${localizedSlugs.en}`}</loc>
          </url>
        `
          : ''
      }
    `
        )
        .join('')}

      ${enBlogs
        .map(
          ({ localizedSlugs }) => `
        ${
          localizedSlugs.en
            ? `
            <url>
                <loc>${`${BASE_URL}/en/blog/${localizedSlugs.en}`}</loc>
            </url>
          `
            : ''
        }
      `
        )
        .join('')}

        ${posts
          .map(
            ({ group, localizedSlugs }) => `
          ${
            localizedSlugs.tr
              ? `
              <url>
                  <loc>${`${BASE_URL}/${group.slug}/${localizedSlugs.tr}`}</loc>
              </url>
            `
              : ''
          }
          ${
            localizedSlugs.en
              ? `
              <url>
                  <loc>${`${BASE_URL}/en/${group.slug}/${localizedSlugs.en}`}</loc>
              </url>
            `
              : ''
          }
        `
          )
          .join('')}
   </urlset>
 `;

const SiteMap = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const [pageDocs, trBlogDocs, enBlogDocs, postDocs] = await Promise.all([
    getCustomPageDataByCondition<PaginatedDocs<PageType>>({
      endpoint: 'pages',
      limit: 1000000
    }),
    getCustomPageDataByCondition<PaginatedDocs<PostType>>({
      endpoint: 'tr-blogs',
      limit: 1000000
    }),
    getCustomPageDataByCondition<PaginatedDocs<PostType>>({
      endpoint: 'en-blogs',
      limit: 1000000
    }),
    getCustomPageDataByCondition<PaginatedDocs<PostType>>({
      endpoint: 'posts',
      limit: 1000000
    })
  ]);

  const sitemap = generateSitemap({
    pages: pageDocs.docs,
    trBlogs: trBlogDocs.docs,
    enBlogs: enBlogDocs.docs,
    posts: postDocs.docs
  });

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {}
  };
};

export default SiteMap;
