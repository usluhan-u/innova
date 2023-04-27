import { GetStaticProps } from 'next';
import { Flex } from '@chakra-ui/react';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { AwardPostType, PageType } from '../collections';
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

export interface AwardProps {
  awardPosts: AwardPostType[];
  page: PageType;
}

const Award = ({ awardPosts, page }: AwardProps) => {
  if (page === null) return <Custom404 />;

  const cardGroupItems = awardPosts.map((awardPost) => {
    const { featuredImage, publishDate, title, slug } = awardPost;

    const cardItem: CardItem = {
      date: publishDate,
      image: featuredImage,
      title,
      callToAction: {
        label: 'Read More',
        type: 'page',
        page: {
          ...awardPost,
          slug: `/award/${slug}`,
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

export default Award;

export const getStaticProps: GetStaticProps = async ({
  locale,
  defaultLocale
}) => {
  const [page, awardPosts] = (await Promise.all([
    getPageBySlug({ slug: 'award', locale, defaultLocale }),
    getCustomPageData({ endpoint: 'award-posts', locale, defaultLocale })
  ])) as [PaginatedDocs<PageType>, PaginatedDocs<AwardPostType>];

  return {
    props: {
      awardPosts: awardPosts.docs,
      page: page.docs[0] || null
    },
    revalidate: 1
  };
};
