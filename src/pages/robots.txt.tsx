import { GetServerSideProps } from 'next';
import { getCustomData } from '../api';
import { RobotsTxtType } from '../globals';

const Robots = () => {};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robotsTxt = await getCustomData<RobotsTxtType>({
    endpoint: 'globals/robots-txt'
  });

  res.write(robotsTxt.content);
  res.end();

  return {
    props: {}
  };
};

export default Robots;
