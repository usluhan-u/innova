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
      callToActionToggle: {
        enableCallToAction: true,
        callToAction: {
          label: 'Read More',
          type: 'page',
          page: {
            slug: `/award/${slug}`
          }
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
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?where[slug][equals]=award&locale=${locale}&fallbackLocale=${defaultLocale}`
    ).then((res) => res.json()),
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/award-posts?locale=${locale}&fallbackLocale=${defaultLocale}`
    ).then((res) => res.json())
  ])) as [PaginatedDocs<PageType>, PaginatedDocs<AwardPostType>];

  return {
    props: {
      awardPosts: awardPosts.docs,
      page: page.docs[0] || null
    },
    revalidate: 1
  };
};
