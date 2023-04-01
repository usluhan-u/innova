import { GetServerSideProps } from 'next';
import Home, { getStaticProps as sharedGetStaticProps } from '../home';

export default Home;

export const getStaticProps: GetServerSideProps = async (context) => {
  const func = sharedGetStaticProps.bind(this);
  return func(context);
};
