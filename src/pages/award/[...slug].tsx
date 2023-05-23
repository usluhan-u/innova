import React from 'react';
import { GetServerSideProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { Image } from '@chakra-ui/react';
import { PostType } from '../../collections';
import { Content, Head, Hero, Template } from '../../components';
import NotFound from '../not-found';
import { getCustomPageDataBySlug } from '../../api';

interface AwardProps {
  data: PostType | null;
}

const Award = ({ data }: AwardProps) => {
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
      {data.featuredImage && (
        <Template
          backgroundColor={data.backgroundColor}
          width={data.width}
          maxWidth="890px"
        >
          <Image
            objectFit="cover"
            src={data.featuredImage.url}
            alt={data.featuredImage.alt}
            h="lg"
            w="full"
            borderRadius="lg"
          />
        </Template>
      )}
      <Content
        blockType="content"
        columns={[{ content: data.content, align: 'left' }]}
        backgroundColor={data.backgroundColor}
        width={data.width}
      />
    </>
  );
};

export default Award;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
  defaultLocale
}) => {
  const slug =
    params?.slug && Array.isArray(params.slug)
      ? params.slug.join('/')
      : 'awards';

  const data = await getCustomPageDataBySlug<PaginatedDocs<PostType>>({
    endpoint: 'posts',
    slug,
    locale,
    defaultLocale
  });

  return {
    props: {
      data: data.docs[0] || null
    }
  };
};
