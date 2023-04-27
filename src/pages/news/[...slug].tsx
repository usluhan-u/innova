import { GetStaticPaths, GetStaticProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { Flex } from '@chakra-ui/react';
import { NewsPostType } from '../../collections';
import { AutoPosition, BackgroundColor, Content } from '../../components';
import Custom404 from '../404';
import { getCustomPageDataBySlug, getList } from '../../api';

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

  const newsPost = await getCustomPageDataBySlug<PaginatedDocs<NewsPostType>>({
    endpoint: 'news-posts',
    slug,
    locale,
    defaultLocale
  });

  return {
    props: {
      newsPost: newsPost.docs[0]
    },
    revalidate: 1
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const data = await getList<PaginatedDocs<NewsPostType>>({
    endpoint: 'news-posts'
  });

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
