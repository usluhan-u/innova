import { GetStaticProps } from 'next';
import { Flex } from '@chakra-ui/react';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { SuccessStoryPostType, PageType } from '../collections';
import {
  AutoPosition,
  BackgroundColor,
  CardGroup,
  CardItem,
  Head,
  Hero
} from '../components';
import Custom404 from './404';
import { getCustomPageData, getPageBySlug } from '../api';

export interface SuccessStoryProps {
  successStoryPosts: SuccessStoryPostType[];
  page: PageType;
}

const SuccessStory = ({ successStoryPosts, page }: SuccessStoryProps) => {
  if (page === null) return <Custom404 />;

  const cardGroupItems = successStoryPosts.map((successStoryPost) => {
    const { category, featuredImage, publishDate, title, slug } =
      successStoryPost;

    const cardItem: CardItem = {
      date: publishDate,
      image: featuredImage,
      title,
      category,
      callToAction: {
        label: 'Read More',
        type: 'page',
        page: {
          ...successStoryPost,
          slug: `/success-story/${slug}`,
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

export default SuccessStory;

export const getStaticProps: GetStaticProps = async ({
  locale,
  defaultLocale
}) => {
  const [page, successStoryPosts] = (await Promise.all([
    getPageBySlug({ slug: 'success-story', locale, defaultLocale }),
    getCustomPageData({
      endpoint: 'success-story-posts',
      locale,
      defaultLocale
    })
  ])) as [PaginatedDocs<PageType>, PaginatedDocs<SuccessStoryPostType>];

  return {
    props: {
      successStoryPosts: successStoryPosts.docs,
      page: page.docs[0] || null
    },
    revalidate: 1
  };
};
