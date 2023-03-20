import React from 'react';
import { GetStaticProps } from 'next';
import Head from '../components/Head';
import { Type as BlogType } from '../collections/Blog';

export type Props = {
  blogs: BlogType[]
  statusCode: number
}

const blogs: React.FC<Props> = (props) => {
  const { blogs } = props;

  let previewTemplate = 0;

  return (

    <header>
    <h1>blogs</h1>
    </header>
      
  );
};

export default blogs;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const page = ctx.params?.page || 1;

  const blogsReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs?page=${page}`);
  const blogsData = await blogsReq.json();

  return {
    props: {
      blogs: blogsData.docs,
    },
    revalidate: 1,
  };
};
