import { GetServerSideProps, GetStaticPaths } from 'next';
import Blogs, { getStaticProps as sharedGetStaticProps } from '../blogs'
;
export default Blogs;

export const getStaticProps: GetServerSideProps = async (ctx) => {
  const func = sharedGetStaticProps.bind(this);
  return func(ctx);
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogsReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/blogs`);
  const blogsData = await blogsReq.json();

  return {
    paths: Array.from(Array(blogsData.totalPages)).map((page, i) => ({
      params: { page: (i + 1).toString() },
    })),
    fallback: false,
  };
};