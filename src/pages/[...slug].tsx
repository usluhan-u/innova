import { GetStaticPaths, GetStaticProps } from 'next';
import payload from 'payload';
import { Head, NotFound, RenderBlocks } from '../components';
import { Page as PageType } from '../payload-types';

export interface PageProps {
  page?: PageType;
  statusCode: number;
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
      />
      <header>
        <h1>{page.title}</h1>
      </header>
      <RenderBlocks layout={page.layout as any} />
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

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug
    ? (context.params.slug as string[]).join('/')
    : 'home';

  const pageQuery = await payload.find({
    collection: 'pages',
    locale: context.locale,
    fallbackLocale: context.defaultLocale,
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

export const getStaticPaths: GetStaticPaths = async () => {
  const pageQuery = await payload.find({
    collection: 'pages',
    limit: 100
  });

  return {
    paths: pageQuery.docs.map(({ slug }: { slug: string }) => ({
      params: { slug: slug.split('/') }
    })),
    fallback: false
  };
};
