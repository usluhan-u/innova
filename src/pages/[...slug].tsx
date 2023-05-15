import React from 'react';
import { GetServerSideProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { PageType } from '../collections';
import NotFound from './not-found';
import { Head, Hero, RenderBlocks } from '../components';
import { getPageBySlug } from '../api';
// import { FlippableCard } from '../components/FlippableCard';

export interface PageProps {
  page?: PageType;
}

const Page = ({ page }: PageProps) => {
  if (!page) return <NotFound />;

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
        <RenderBlocks layout={page.content.layout} />
      )}
      {/* <FlippableCard
        category={{ name: 'Telekomünikasyon' }}
        featuredImage={{
          url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
          alt: 'alt text',
          filename: 'blog-2.jpeg',
          filesize: 123,
          height: 123,
          width: 123,
          mimeType: 'image/jpeg'
        }}
        name="Telekomünikasyon"
        callToAction={{
          label: 'Read More',
          type: 'page',
          page: {
            breadcrumbs: [],
            slug: `/success-story`,
            content: undefined,
            meta: {},
            name: 'Telekomünikasyon'
          }
        }}
      /> */}
    </>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
  defaultLocale
}) => {
  const slug =
    params?.slug && Array.isArray(params.slug) ? params.slug.join('/') : 'home';

  const page = await getPageBySlug<PaginatedDocs<PageType>>({
    slug,
    locale,
    defaultLocale
  });

  return {
    props: {
      page: page.docs[0] || null
    }
  };
};
