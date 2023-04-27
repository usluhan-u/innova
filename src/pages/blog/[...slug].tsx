import { GetStaticPaths, GetStaticProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { Flex } from '@chakra-ui/react';
import { BlogPostType } from '../../collections';
import { AutoPosition, BackgroundColor, Content } from '../../components';
import Custom404 from '../404';
import { getCustomPageDataBySlug, getList } from '../../api';

interface BlogPostProps {
  blogPost?: BlogPostType;
}

const BlogPost = ({ blogPost }: BlogPostProps) => {
  if (!blogPost) return <Custom404 />;

  return (
    <BackgroundColor bgColor={blogPost.backgroundColor}>
      <AutoPosition>
        <Flex w={{ base: 'full', md: blogPost.width }}>
          <Content
            blockType="content"
            columns={[{ content: blogPost.content, textAlign: 'left' }]}
          />
        </Flex>
      </AutoPosition>
    </BackgroundColor>
  );
};

export default BlogPost;

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  defaultLocale
}) => {
  const slug = params?.slug ? (params.slug as string[]).join('/') : 'home';

  const blogPost = await getCustomPageDataBySlug<PaginatedDocs<BlogPostType>>({
    endpoint: 'blog-posts',
    slug,
    locale,
    defaultLocale
  });

  return {
    props: {
      blogPost: blogPost.totalDocs && blogPost.docs[0]
    },
    revalidate: 1
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const data = await getList<PaginatedDocs<BlogPostType>>({
    endpoint: 'blog-posts'
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
