import React from 'react';
import { GetServerSideProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { PageType, PostType } from '../../collections';
import { getCustomPageDataByCondition, getPageBySlug } from '../../api';
import NotFound from '../not-found';
import { CardGroup, CardItem, Head, Hero, Template } from '../../components';

export interface SuccessStoriesProps {
  page: PageType | null;
  data: PostType[];
}

const SuccessStories = ({ page, data }: SuccessStoriesProps) => {
  if (page === null) return <NotFound />;

  const cardGroupItems = data.map((item) => {
    const { category, featuredImage, publishDate, name, slug } = item;

    const cardItem: CardItem = {
      date: publishDate,
      image: featuredImage,
      title: name,
      category,
      callToAction: {
        label: 'Read More',
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
      {page.content && Object.keys(page.content).length > 0 && (
        <Template backgroundColor="gray" width="100%">
          <CardGroup items={cardGroupItems} />
        </Template>
      )}
    </>
  );
};

export default SuccessStories;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale
}) => {
  const [page, data] = await Promise.all([
    getPageBySlug<PaginatedDocs<PageType>>({
      slug: 'success-stories',
      locale,
      defaultLocale
    }),
    getCustomPageDataByCondition<PaginatedDocs<PostType>>({
      endpoint: 'posts',
      condition: `[group.slug][equals]=success-story`,
      locale,
      defaultLocale
    })
  ]);

  return {
    props: {
      page: page.docs[0] || null,
      data: data.docs
    }
  };
};
