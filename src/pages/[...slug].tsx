import { GetStaticPaths, GetStaticProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { PageType } from '../collections';
import NotFound from './not-found';
import { Head, Hero, RenderBlocks } from '../components';
import { getList, getPageBySlug } from '../api';

export interface PageProps {
  page?: PageType;
}

const Page = ({ page }: PageProps) => {
  if (!page) return <NotFound />;

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
      <RenderBlocks layout={page.layout} />
    </>
  );
};

export default Page;

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  defaultLocale
}) => {
  const slug = params?.slug ? (params.slug as string[]).join('/') : 'home';

  const page = await getPageBySlug<PaginatedDocs<PageType>>({
    slug,
    locale,
    defaultLocale
  });

  return {
    props: {
      page: page.docs[0] || null
    },
    revalidate: 1
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const data = await getList<PaginatedDocs<PageType>>({
    endpoint: 'pages?limit=100'
  });

  const paths = data.docs.map(({ slug }) => ({
    params: { slug: slug.split('/') }
  }));

  const localizedPaths = locales
    ? paths.flatMap((path) => locales.map((locale) => ({ ...path, locale })))
    : [];

  return {
    paths: [...paths, ...localizedPaths],
    fallback: false
  };
};
