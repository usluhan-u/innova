import React from 'react';
import { GetServerSideProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { PageType } from '../collections';
import Custom404 from './404';
import { Head, Hero, RenderBlocks } from '../components';
import { getPageBySlug } from '../api';
import { useData } from '../contexts';

export interface PageProps {
  page?: PageType;
}

const Page = ({ page }: PageProps) => {
  const { setLocalizedSlugs } = useData();

  React.useEffect(() => {
    if (setLocalizedSlugs && typeof setLocalizedSlugs === 'function')
      setLocalizedSlugs(page?.localizedSlugs || {});
  }, [page, setLocalizedSlugs]);

  if (!page) return <Custom404 />;

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
