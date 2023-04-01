import { GetStaticProps } from 'next';
import { Head, MediaSlider } from '../components';
import { Home as HomeType } from '../payload-types';
import payload from 'payload';

export interface HomeProps {
  page?: HomeType;
}

const Home = ({ page }: HomeProps) => {
  return (
    <main>
      <Head
        title={page?.meta?.title || page?.title}
        description={page?.meta?.description}
        keywords={page?.meta?.keywords}
      />
      {page?.hero && page?.hero.slides && (
        <MediaSlider slides={page?.hero.slides as any} />
      )}
    </main>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug
    ? (context.params.slug as string[]).join('/')
    : 'home';
  console.log(
    '🚀 ~ file: home.tsx:29 ~ constgetStaticProps:GetStaticProps= ~ slug:',
    slug
  );

  const pageQuery = await payload.find({
    collection: 'homes',
    locale: context.locale,
    fallbackLocale: context.defaultLocale,
    where: {
      slug: {
        equals: slug
      }
    }
  });

  if (pageQuery.docs[0]) {
    return {
      props: {
        page: pageQuery.docs[0]
      },
      revalidate: 1
    };
  }

  return {
    props: {}
  };
};
