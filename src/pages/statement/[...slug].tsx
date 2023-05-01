import { GetStaticPaths, GetStaticProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { Flex } from '@chakra-ui/react';
import { PostType } from '../../collections';
import {
  AutoPosition,
  BackgroundColor,
  Content,
  Head,
  Hero
} from '../../components';
import NotFound from '../not-found';
import { getCustomPageDataBySlug, getAll } from '../../api';

interface StatementProps {
  data: PostType | null;
}

const Statement = ({ data }: StatementProps) => {
  if (data === null) return <NotFound />;

  return (
    <>
      <Head
        title={data.meta?.title || data.name}
        description={data.meta?.description}
        keywords={data.meta?.keywords}
        noIndex={data.meta?.noIndex}
      />
      <Hero
        {...data.hero}
        breadcrumbs={data.breadcrumbs}
        activeSlug={data.slug}
      />
      <BackgroundColor bgColor={data.backgroundColor}>
        <AutoPosition>
          <Flex w={{ base: 'full', md: data.width }}>
            <Content
              blockType="content"
              columns={[{ content: data.content, textAlign: 'left' }]}
            />
          </Flex>
        </AutoPosition>
      </BackgroundColor>
    </>
  );
};

export default Statement;

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  defaultLocale
}) => {
  const slug =
    params?.slug && Array.isArray(params.slug)
      ? params.slug.join('/')
      : 'statements';

  const data = await getCustomPageDataBySlug<PaginatedDocs<PostType>>({
    endpoint: 'posts',
    slug,
    locale,
    defaultLocale
  });

  return {
    props: {
      data: data.docs[0] || null
    },
    revalidate: 1
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const data = await getAll<PaginatedDocs<PostType>>({
    endpoint: 'posts'
  });

  const paths = data.docs.map(({ slug }) => ({
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
