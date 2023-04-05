import { GetStaticProps } from 'next';
import payload from 'payload';
import { HomeType } from '../collections';
import {
  Head,
  HomeHeroSlider,
  HomeProductsSummarySlider,
  NotFound
} from '../components';

export interface HomeProps {
  page: HomeType;
}

const Home = ({ page }: HomeProps) => {
  if (!page) {
    return <NotFound />;
  }

  return (
    <>
      <Head
        title={page.meta?.title || page.title}
        description={page.meta?.description}
        keywords={page.meta?.keywords}
        noIndex={page.meta?.noIndex}
      />
      <HomeHeroSlider slides={page.hero.slides} />
      <HomeProductsSummarySlider
        title={page.productsSummary.title}
        slides={page.productsSummary.slides}
      />
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  defaultLocale
}) => {
  const slug = params?.slug || 'home';

  const homeQuery = await payload.find({
    collection: 'home',
    locale,
    fallbackLocale: defaultLocale,
    where: {
      slug: {
        equals: slug
      }
    }
  });

  if (homeQuery.docs[0]) {
    return {
      props: {
        page: homeQuery.docs[0]
      },
      revalidate: 1
    };
  }

  return {
    props: {}
  };
};
