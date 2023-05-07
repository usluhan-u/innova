import React from 'react';
import { GetServerSideProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { Flex } from '@chakra-ui/react';
import { PageType } from '../collections';
import NotFound from './not-found';
import {
  AutoPosition,
  BackgroundColor,
  Head,
  Hero,
  RenderBlocks
} from '../components';
import { getPageBySlug } from '../api';

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
      <Hero
        {...page.hero}
        breadcrumbs={page.breadcrumbs}
        activeSlug={page.slug}
      />
      {page.content && Object.keys(page.content).length > 0 && (
        <BackgroundColor bgColor={page.content.backgroundColor}>
          <AutoPosition>
            <Flex flexDir="column" w={{ base: 'full', md: page.content.width }}>
              <RenderBlocks layout={page.content.layout} />
            </Flex>
          </AutoPosition>
        </BackgroundColor>
      )}
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
