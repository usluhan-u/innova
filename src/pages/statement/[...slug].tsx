import React from 'react';
import { GetServerSideProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { Flex, Image, Text } from '@chakra-ui/react';
import { format } from 'date-fns';
import { enUS, tr } from 'date-fns/locale';
import { PostType } from '../../collections';
import {
  CardGroup,
  CardItem,
  Content,
  Head,
  Hero,
  Template
} from '../../components';
import Custom404 from '../404';
import {
  getCustomPageDataByCondition,
  getCustomPageDataBySlug
} from '../../api';
import { Language, useData, useLanguage } from '../../contexts';
// import { calculateReadingTime } from '../../utils';

interface StatementProps {
  data: PostType | null;
  relatedData: PostType[];
}

const Statement = ({ data, relatedData }: StatementProps) => {
  const { language } = useLanguage();
  const { setLocalizedSlugs } = useData();

  React.useEffect(() => {
    if (setLocalizedSlugs && typeof setLocalizedSlugs === 'function')
      setLocalizedSlugs(data?.localizedSlugs || {});
  }, [data, setLocalizedSlugs]);

  if (data === null) return <Custom404 />;

  const cardGroupItems = relatedData.map((item) => {
    const { category, featuredImage, publishDate, name, slug } = item;

    const cardItem: CardItem = {
      date: publishDate,
      image: featuredImage,
      title: name,
      category,
      callToAction: {
        label: language === 'tr' ? 'Detaylı Bilgi' : 'Read More',
        type: 'page',
        page: {
          ...item,
          slug: `/statement/${slug}`,
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
        breadcrumbs={[
          {
            url: '/home',
            label: language === 'tr' ? 'Ana Sayfa' : 'Home Page',
            doc: 'home'
          },
          {
            url: '/statements',
            label: language === 'tr' ? 'Haberler' : 'News',
            doc: 'news'
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
          <Flex boxSize="full" flexDir="column" gap="2">
            <Image
              objectFit="fill"
              src={data.featuredImage.url}
              alt={data.featuredImage.alt}
              h="lg"
              w="full"
              borderRadius="lg"
            />
            <Text fontWeight="medium" fontSize={{ base: 'sm', md: 'lg' }}>
              {format(new Date(data.publishDate), 'PP', {
                locale: language === 'tr' ? tr : enUS
              })}
            </Text>
          </Flex>
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
              {language === 'tr' ? 'İlgili Postlar' : 'Related Articles'}
            </Text>
            <CardGroup
              items={cardGroupItems}
              locale={(language as Language) || 'tr'}
            />
          </Flex>
        </Template>
      )}
    </>
  );
};

export default Statement;

export const getServerSideProps: GetServerSideProps = async ({
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

  let relatedData;

  if (data.totalDocs > 0) {
    const condition = slug
      ? `[group.slug][equals]=statement&where[category.slug][equals]=${data.docs[0].category?.slug}`
      : `[group.slug][equals]=statement`;

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
