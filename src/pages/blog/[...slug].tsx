import { GetStaticPaths, GetStaticProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { Flex } from '@chakra-ui/react';
import { BlogPostType } from '../../collections';
import { AutoPosition, BackgroundColor, Content } from '../../components';
import Custom404 from '../404';

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

  const blogPostQuery = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog-posts?where[slug][equals]=${slug}&locale=${locale}&fallbackLocale=${defaultLocale}`
  );
  const blogPost: PaginatedDocs<BlogPostType> = await blogPostQuery.json();

  return {
    props: {
      blogPost: blogPost.totalDocs && blogPost.docs[0]
    },
    revalidate: 1
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog-posts`
  );
  const data: PaginatedDocs<BlogPostType> = await request.json();

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
