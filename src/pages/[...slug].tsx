import React from 'react';
import payload from 'payload';
import { GetStaticPaths, GetStaticProps } from 'next';
import getConfig from 'next/config';
import { NotFound } from '../components';
import { Page as PageType } from '../payload-types';
// import Head from '../components/Head';
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
      {/* <RenderBlocks layout={page.layout as any} /> */}
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

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug || '/';

  const pageReq = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?where[slug][equals]=${slug}`
  );
  const pageData = await pageReq.json();

  return {
    props: {
      page: pageData.docs[0]
    },
    revalidate: 1
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pageReq = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pages?limit=100`
  );
  const pageData = await pageReq.json();

  return {
    paths: pageData.docs.map(({ slug }: { slug: string }) => ({
      params: { slug: slug.split('/') }
    })),
    fallback: false
  };
};
