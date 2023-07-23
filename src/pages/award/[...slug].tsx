import React from 'react';
import { GetServerSideProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { enUS, tr } from 'date-fns/locale';
import { format } from 'date-fns';
import { PostType } from '../../collections';
import {
  CardGroup,
  CardItem,
  Content,
  Head,
  Hero,
  Image,
  Template
} from '../../components';
import Custom404 from '../404';
import {
  getCustomPageDataByCondition,
  getCustomPageDataBySlug
} from '../../api';
import { Language } from '../../contexts';

interface AwardProps {
  data: PostType | null;
  relatedData: PostType[];
}

const Award = ({ data, relatedData }: AwardProps) => {
  const router = useRouter();
  if (data === null) return <Custom404 />;

  const cardGroupItems = relatedData.map((item) => {
    const { category, featuredImage, publishDate, name, slug } = item;

    const cardItem: CardItem = {
      date: publishDate,
      image: featuredImage,
      title: name,
      category,
      callToAction: {
        label: router.locale === 'tr' ? 'Detaylı Bilgi' : 'Read More',
        type: 'page',
        page: {
          ...item,
          slug: `/award/${slug}`,
          content: undefined
        }
      }
    };

    return cardItem;
  });

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
        description={format(new Date(data.publishDate), 'PP', {
          locale: router.locale === 'tr' ? tr : enUS
        })}
        breadcrumbs={[
          {
            url: '/home',
            label: router.locale === 'tr' ? 'Ana Sayfa' : 'Home Page',
            doc: 'home'
          },
          {
            url: '/awards',
            label: router.locale === 'tr' ? 'Ödüller' : 'Awards',
            doc: 'award'
          },
          ...data.breadcrumbs
        ]}
        activeSlug={data.slug}
      />
      {data.featuredImage && (
        <Template
          backgroundColor={data.backgroundColor}
          width={data.width}
          maxWidth="890px"
        >
          <Image
            src={data.featuredImage.url}
            alt={data.featuredImage.alt}
            objectFit="cover"
            h="lg"
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
      {relatedData.length > 0 && (
        <Template backgroundColor="background.secondary" width="100%">
          <Flex w="full" direction="column" gap={7}>
            <Text color="text.primary" fontSize="xl" fontWeight="semibold">
              İlgili Postlar
            </Text>
            <CardGroup
              items={cardGroupItems}
              locale={(router.locale as Language) || 'tr'}
            />
          </Flex>
        </Template>
      )}
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

  let relatedData;

  if (data.totalDocs > 0) {
    const condition = slug
      ? `[group.slug][equals]=award&where[category.slug][equals]=${data.docs[0].category?.slug}`
      : `[group.slug][equals]=award`;

    relatedData = await getCustomPageDataByCondition<PaginatedDocs<PostType>>({
      endpoint: 'posts',
      condition,
      locale,
      defaultLocale
    });
  }

  return {
    props: {
      data: data.docs[0] || null,
      relatedData: relatedData?.docs || []
    }
  };
};
