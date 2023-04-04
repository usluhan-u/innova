import { GetServerSideProps, GetStaticPaths } from 'next';
import Home, { getStaticProps as sharedGetStaticProps } from '../home';
import { HomeType } from '../../collections';

export default Home;

export const getStaticProps: GetServerSideProps = async (context) => {
  const func = sharedGetStaticProps.bind(this);
  return func(context);
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const homeRequest = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/home?limit=100`
  );
  const homeData = await homeRequest.json();

  const paths = (homeData.docs as HomeType[]).map(({ slug }) => ({
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
