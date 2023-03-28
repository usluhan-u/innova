import React from 'react';
import payload from 'payload';
import { GetServerSideProps } from 'next';
import getConfig from 'next/config';
import { PageType } from '../collections';
import { NotFound } from '../components';
// import { Type as PageType } from '../collections/Page';
// import Head from '../components/Head';
// import classes from '../css/page.module.css';
// import RenderBlocks from '../components/RenderBlocks';

const {
  publicRuntimeConfig: { SERVER_URL }
} = getConfig();

export type Props = {
  page?: PageType;
  statusCode: number;
};

const Page: React.FC<Props> = (props) => {
  const { page } = props;

  if (!page) {
    return <NotFound />;
  }

  return (
    <main>
      {/* <Head
        title={page.meta?.title || page.title}
        description={page.meta?.description}
        keywords={page.meta?.keywords}
      /> */}
      <header>
        <h1>{page.title}</h1>
      </header>
      {/* <div>
        {page.image && (
          <img
            src={`${SERVER_URL}/media/${
              page.image.sizes?.feature?.filename || page.image.filename
            }`}
            alt={page.image.alt}
          />
        )}
      </div> */}
      {/* <RenderBlocks layout={page.layout} /> */}
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
