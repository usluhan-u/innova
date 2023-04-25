import { GetStaticPaths, GetStaticProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { Flex } from '@chakra-ui/react';
import { NewsPostType } from '../../collections';
import { AutoPosition, BackgroundColor, Content } from '../../components';
import Custom404 from '../404';

interface NewsPostProps {
  newsPost?: NewsPostType;
}

const NewsPost = ({ newsPost }: NewsPostProps) => {
  if (!newsPost) return <Custom404 />;

  return (
    <BackgroundColor bgColor={newsPost.backgroundColor}>
      <AutoPosition>
        <Flex w={{ base: 'full', md: newsPost.width }}>
          <Content
            blockType="content"
            columns={[{ content: newsPost.content, textAlign: 'left' }]}
          />
        </Flex>
      </AutoPosition>
    </BackgroundColor>
  );
};

export default NewsPost;

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  defaultLocale
}) => {
  const slug = params?.slug ? (params.slug as string[]).join('/') : 'home';

  const newsPostQuery = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/news-posts?where[slug][equals]=${slug}&locale=${locale}&fallbackLocale=${defaultLocale}`
  );
  const newsPost: PaginatedDocs<NewsPostType> = await newsPostQuery.json();

  return {
    props: {
      newsPost: newsPost.docs[0]
    },
    revalidate: 1
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/news-posts`
  );
  const data: PaginatedDocs<NewsPostType> = await request.json();

  const paths = data.docs.map(({ slug }) => ({
    params: { slug: slug.split('/') }
  }));

  const localizedPaths = locales
    ? paths.flatMap((path) => locales.map((locale) => ({ ...path, locale })))
    : [];

  return {
    paths: [...paths, ...localizedPaths],
    fallback: false
  };
};
