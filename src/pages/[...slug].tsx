import { GetStaticPaths, GetStaticProps } from 'next';
import payload from 'payload';
import { Head, NotFound, RenderBlocks } from '../components';
import { Page as PageType } from '../payload-types';
import { PageLayout } from '../collections';

export interface PageProps {
  page?: PageType;
}

const Page = ({ page }: PageProps) => {
  if (!page) {
    return <NotFound />;
  }

  return (
    <main>
      <Head
        title={page.meta?.title || page.title}
        description={page.meta?.description}
        keywords={page.meta?.keywords}
        noIndex={page.meta?.noIndex}
      />
      <header>
        <h1>{page.title}</h1>
      </header>
      <RenderBlocks layout={page.layout as PageLayout[]} />
      <footer>
        <hr />
        NextJS + Payload Server Boilerplate made by
        <a
          href="https://payloadcms.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Payload
        </a>
      </footer>
    </main>
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

  if (pageQuery.docs[0]) {
    return {
      props: {
        page: pageQuery.docs[0]
      },
      revalidate: 1
    };
  }

  return {
    props: {}
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const pageQuery = await payload.find({
    collection: 'pages',
    limit: 100
  });

  const paths = pageQuery.docs.map(({ slug }: { slug: string }) => ({
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
