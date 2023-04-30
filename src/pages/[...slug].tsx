import { GetStaticPaths, GetStaticProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { PageType } from '../collections';
import NotFound from './not-found';
import { Head, Hero, RenderBlocks } from '../components';
import { getAll, getPageBySlug } from '../api';

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
    },
    revalidate: 1
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const data = await getAll<PaginatedDocs<PageType>>({
    endpoint: 'pages?limit=1000'
  });

  const customPages = ['success-stories', 'awards', 'blogs', 'news'];
  const slugs = data.docs.map(({ slug }) => slug);

  const paths = slugs
    .filter((slug) => !customPages.includes(slug))
    .map((slug) => ({
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
