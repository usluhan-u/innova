import { GetStaticPaths, GetStaticProps } from 'next';
import payload from 'payload';
import { PageType } from '../collections';
import { NotFound } from './NotFound';
import { Head, Hero, RenderBlocks } from '../components';
import { NotFoundType } from '../globals';

export interface PageProps {
  page?: PageType;
  notFound?: NotFoundType;
}

const Page = ({ page, notFound }: PageProps) => {
  if (!page) {
    return <NotFound {...notFound} />;
  }

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

  const pageQuery = await payload.find({
    collection: 'pages',
    locale,
    fallbackLocale: defaultLocale,
    where: {
      slug: {
        equals: slug
      }
    }
  });

  const notFoundQuery = await payload.findGlobal({
    slug: 'not-found',
    locale,
    fallbackLocale: defaultLocale
  });

  if (pageQuery.docs[0]) {
    return {
      props: {
        page: pageQuery.docs[0]
      },
      revalidate: 1
    };
  }

  return {
    props: {
      notFound: notFoundQuery
    }
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const pageRequest = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?limit=100`
  );
  const pageData = await pageRequest.json();

  const paths = (pageData.docs as PageType[]).map(({ slug }) => ({
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
