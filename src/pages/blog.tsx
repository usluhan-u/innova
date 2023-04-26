import { GetStaticProps } from 'next';
import { Flex } from '@chakra-ui/react';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { BlogPostType, PageType } from '../collections';
import {
  AutoPosition,
  BackgroundColor,
  CardGroup,
  CardItem,
  Head,
  Hero
} from '../components';
import Custom404 from './404';

export interface BlogProps {
  blogPosts: BlogPostType[];
  page: PageType;
}

const Blog = ({ blogPosts, page }: BlogProps) => {
  if (page === null) return <Custom404 />;

  const cardGroupItems = blogPosts.map((blogPost) => {
    const { category, featuredImage, publishDate, title, slug } = blogPost;

    const cardItem: CardItem = {
      date: publishDate,
      image: featuredImage,
      title,
      category,
      callToAction: {
        label: 'Read More',
        type: 'page',
        page: {
          ...blogPost,
          slug: `/blog/${slug}`,
          layout: []
        }
      }
    };

    return cardItem;
  });

  return (
    <>
      <Head
        title={page.meta?.title || page.title}
        description={page.meta?.description}
        keywords={page.meta?.keywords}
        noIndex={page.meta?.noIndex}
      />
      <Hero
        {...page.hero}
        breadcrumbs={page.breadcrumbs}
        activeSlug={page.slug}
      />
      <BackgroundColor bgColor={page.backgroundColor}>
        <AutoPosition>
          <Flex w={{ base: 'full', md: page.width }}>
            <CardGroup items={cardGroupItems} />
          </Flex>
        </AutoPosition>
      </BackgroundColor>
    </>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async ({
  locale,
  defaultLocale
}) => {
  const [page, blogPosts] = (await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?where[slug][equals]=blog&locale=${locale}&fallbackLocale=${defaultLocale}`
    ).then((res) => res.json()),
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/blog-posts?locale=${locale}&fallbackLocale=${defaultLocale}`
    ).then((res) => res.json())
  ])) as [PaginatedDocs<PageType>, PaginatedDocs<BlogPostType>];

  return {
    props: {
      blogPosts: blogPosts.docs,
      page: page.docs[0] || null
    },
    revalidate: 1
  };
};
