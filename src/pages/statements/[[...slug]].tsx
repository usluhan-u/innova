import React from 'react';
import { GetServerSideProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { PageType, PostType } from '../../collections';
import { getCustomPageDataByCondition, getPageBySlug } from '../../api';
import Custom404 from '../404';
import {
  CardGroup,
  CardItem,
  Head,
  Hero,
  RenderBlocks,
  Template
} from '../../components';

export interface StatementsProps {
  page: PageType | null;
  data: PostType[];
}

const Statements = ({ page, data }: StatementsProps) => {
  if (page === null) return <Custom404 />;

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
          slug: `/statement/${slug}`,
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
      {data.length > 0 && (
        <Template backgroundColor="background.secondary" width="100%">
          <CardGroup items={cardGroupItems} />
        </Template>
      )}
      {page.content && Object.keys(page.content).length > 0 && (
        <RenderBlocks layout={page.content.layout} />
      )}
    </>
  );
};

export default Statements;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
  defaultLocale
}) => {
  const slug =
    params?.slug && Array.isArray(params.slug)
      ? params.slug.join('/')
      : undefined;

  const condition = slug
    ? `[group.slug][equals]=statement&where[category.slug][equals]=${slug}`
    : `[group.slug][equals]=statement`;

  const [page, data] = await Promise.all([
    getPageBySlug<PaginatedDocs<PageType>>({
      slug: slug || 'statements',
      locale,
      defaultLocale
    }),
    getCustomPageDataByCondition<PaginatedDocs<PostType>>({
      endpoint: 'posts',
      condition,
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
