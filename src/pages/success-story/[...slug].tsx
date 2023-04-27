import { GetStaticPaths, GetStaticProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { Flex } from '@chakra-ui/react';
import { SuccessStoryPostType } from '../../collections';
import { AutoPosition, BackgroundColor, Content } from '../../components';
import Custom404 from '../404';
import { getCustomPageDataBySlug, getList } from '../../api';

interface SuccessStoryPostProps {
  successStoryPost?: SuccessStoryPostType;
}

const SuccessStoryPost = ({ successStoryPost }: SuccessStoryPostProps) => {
  if (!successStoryPost) return <Custom404 />;

  return (
    <BackgroundColor bgColor={successStoryPost.backgroundColor}>
      <AutoPosition>
        <Flex w={{ base: 'full', md: successStoryPost.width }}>
          <Content
            blockType="content"
            columns={[{ content: successStoryPost.content, textAlign: 'left' }]}
          />
        </Flex>
      </AutoPosition>
    </BackgroundColor>
  );
};

export default SuccessStoryPost;

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  defaultLocale
}) => {
  const slug = params?.slug ? (params.slug as string[]).join('/') : 'home';

  const successStoryPost = await getCustomPageDataBySlug<
    PaginatedDocs<SuccessStoryPostType>
  >({
    endpoint: 'success-story-posts',
    slug,
    locale,
    defaultLocale
  });

  return {
    props: {
      successStoryPost: successStoryPost.docs[0]
    },
    revalidate: 1
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const data = await getList<PaginatedDocs<SuccessStoryPostType>>({
    endpoint: 'success-story-posts'
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
