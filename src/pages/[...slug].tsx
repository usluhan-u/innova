import { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import { Head, NotFound, RenderBlocks } from '../components';
import { Page as PageType } from '../payload-types';
import payload from 'payload';

const {
  publicRuntimeConfig: { SERVER_URL }
} = getConfig();

export interface PageProps {
  page?: PageType;
  statusCode: number;
}

const Page = ({ page }: PageProps) => {
  console.log(
    '🚀 ~ file: [...slug].tsx:17 ~ Page ~ page:',
    JSON.stringify(page, null, 2)
  );
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const slug = ctx.params?.slug
    ? (ctx.params.slug as string[]).join('/')
    : 'home';

  const pageQuery = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug
      }
    }
  });

  if (!pageQuery.docs[0]) {
    ctx.res.statusCode = 404;

    return {
      props: {}
    };
  }

  return {
    props: {
      page: pageQuery.docs[0]
    }
  };
};
