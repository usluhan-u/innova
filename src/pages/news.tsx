import { GetStaticProps } from 'next';
import { Flex } from '@chakra-ui/react';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { NewsPostType, PageType } from '../collections';
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

export interface NewsProps {
  newsPosts: NewsPostType[];
  page: PageType;
}

const News = ({ newsPosts, page }: NewsProps) => {
  if (page === null) return <Custom404 />;

  const cardGroupItems = newsPosts.map((newsPost) => {
    const { featuredImage, publishDate, title, slug } = newsPost;

    const cardItem: CardItem = {
      date: publishDate,
      image: featuredImage,
      title,
      callToAction: {
        label: 'Read More',
        type: 'page',
        page: {
          ...newsPost,
          slug: `/news/${slug}`,
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

export default News;

export const getStaticProps: GetStaticProps = async ({
  locale,
  defaultLocale
}) => {
  const [page, newsPosts] = (await Promise.all([
    getPageBySlug({ slug: 'news', locale, defaultLocale }),
    getCustomPageData({ endpoint: 'news-posts', locale, defaultLocale })
  ])) as [PaginatedDocs<PageType>, PaginatedDocs<NewsPostType>];

  return {
    props: {
      newsPosts: newsPosts.docs,
      page: page.docs[0] || null
    },
    revalidate: 1
  };
};
