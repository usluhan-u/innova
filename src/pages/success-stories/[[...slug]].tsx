import React from 'react';
import { GetServerSideProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { useRouter } from 'next/router';
import { VStack } from '@chakra-ui/react';
import { PageType, PostType } from '../../collections';
import { getCustomPageDataByCondition, getPageBySlug } from '../../api';
import Custom404 from '../404';
import {
  CardGroup,
  CardItem,
  Head,
  Hero,
  Pagination,
  RenderBlocks,
  Template
} from '../../components';
import { Language, useData, useLanguage } from '../../contexts';

export interface SuccessStoriesProps {
  page: PageType | null;
  totalDocs: number;
  data: PostType[];
}

const SuccessStories = ({ page, data, totalDocs }: SuccessStoriesProps) => {
  const { language } = useLanguage();
  const { setLocalizedSlugs } = useData();
  const router = useRouter();

  React.useEffect(() => {
    if (setLocalizedSlugs && typeof setLocalizedSlugs === 'function')
      setLocalizedSlugs(page?.localizedSlugs || {});
  }, [page, setLocalizedSlugs]);

  if (page === null) return <Custom404 />;

  const cardGroupItems = data.map((item) => {
    const { category, featuredImage, publishDate, name, slug } = item;

    const cardItem: CardItem = {
      date: publishDate,
      image: featuredImage,
      title: name,
      category: category && {
        ...category,
        slug: `/success-stories/${category.slug}`
      },
      callToAction: {
        label: language === 'tr' ? 'Detaylı Bilgi' : 'Read More',
        type: 'page',
        page: {
          ...item,
          slug: `/success-story/${slug}`,
          content: undefined
        }
      }
    };

    return cardItem;
  });

  const handlePageChange = (nextPage: number) =>
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: nextPage }
    });

  return (
    <>
      <Head
        title={page.meta?.title || page.name}
        description={page.meta?.description}
        keywords={page.meta?.keywords}
        noIndex={page.meta?.noIndex}
      />
      {page.hero && (
        <Hero
          {...page.hero}
          breadcrumbs={page.breadcrumbs}
          activeSlug={page.slug}
        />
      )}
      {data.length > 0 && (
        <Template backgroundColor="background.secondary" width="100%">
          <VStack w="full" spacing={10}>
            <CardGroup
              items={cardGroupItems}
              locale={(language as Language) || 'tr'}
            />
            <Pagination totalSize={totalDocs} onPageChange={handlePageChange} />
          </VStack>
        </Template>
      )}
      {page.content && Object.keys(page.content).length > 0 && (
        <RenderBlocks layout={page.content.layout} />
      )}
    </>
  );
};

export default SuccessStories;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
  defaultLocale,
  query
}) => {
  const slug =
    params?.slug && Array.isArray(params.slug)
      ? params.slug.join('/')
      : undefined;

  const condition = slug
    ? `[group.slug][equals]=success-story&where[category.slug][equals]=${slug}`
    : `[group.slug][equals]=success-story`;

  const pageNumber = query.page ? parseInt(query.page as string, 10) : 1;

  const [page, data] = await Promise.all([
    getPageBySlug<PaginatedDocs<PageType>>({
      slug: slug || 'success-stories',
      locale,
      defaultLocale
    }),
    getCustomPageDataByCondition<PaginatedDocs<PostType>>({
      endpoint: 'posts',
      condition,
      locale,
      defaultLocale,
      limit: 12,
      page: pageNumber,
      sortBy: 'publishDate',
      sortOrder: 'desc'
    })
  ]);

  return {
    props: {
      page: page.docs[0] || null,
      totalDocs: data.totalDocs,
      data: data.docs
    }
  };
};
