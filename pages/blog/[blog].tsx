/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Head from '../../components/Head';
import Header from '../../Layouts/Header';
import { Type as BlogType } from '../../collections/Blog';
import RenderBlocks from '../../components/RenderBlocks';



export type Props = {
  blog: BlogType
  statusCode: number
}

const Blog: React.FC<Props> = (props) => {
  const { blog } = props;

  return (
    <main>
        <Head
        title={blog.meta?.title || blog.title}
        description={blog.meta?.description}
        keywords={blog.meta?.keywords}
      />

    <Header />
      <header >
        <h1>{blog.title}</h1>
      </header>
      <div >
        {blog.image && (
          <img
            src={`/media/${blog.image.sizes?.feature?.filename || blog.image.filename}`}
            alt={blog.image.alt}
          />
        )}
      </div>
      <RenderBlocks layout={blog.layout} />
      <footer >
        <hr />
        İnnova
      </footer>
    </main>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.blog;

  const blogReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs?where[slug][equals]=${slug}`);
  const blogData = await blogReq.json();

  return {
    props: {
      blog: blogData.docs[0],
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs?limit=100`);
  const blogData = await blogReq.json();

  return {
    paths: blogData.docs.map(({ slug }) => ({
      params: { blog: slug },
    })),
    fallback: false,
  };
};
