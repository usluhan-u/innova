import React from 'react';
import { GetServerSideProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { v4 as uuidv4 } from 'uuid';
import { Flex, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { PageType, PostType } from '../collections';
import NotFound from './not-found';
import {
  AutoPosition,
  BackgroundColor,
  ButtonCallToAction,
  Head,
  Hero,
  RenderBlocks,
  Template,
  TextIconCallToAction,
  UnstyledFlippableCard
} from '../components';
import { getCustomPageDataByCondition, getPageBySlug } from '../api';

export interface HomeProps {
  page?: PageType;
  blogs: PostType[];
  successStories: PostType[];
}

const Home = ({ page, blogs, successStories }: HomeProps) => {
  if (!page) return <NotFound />;

  return (
    <>
      <Head
        title={page.meta?.title || page.name}
        description={page.meta?.description}
        keywords={page.meta?.keywords}
        noIndex={page.meta?.noIndex}
      />
      {page.hero && (
        <Hero
          {...page.hero}
          breadcrumbs={page.breadcrumbs}
          activeSlug={page.slug}
        />
      )}
      {page.content && Object.keys(page.content).length > 0 && (
        <RenderBlocks layout={page.content.layout} />
      )}
      {blogs?.length > 0 && (
        <BackgroundColor bgColor="background.primary">
          <VStack spacing="8" align="stretch" w="full">
            <AutoPosition mb={0}>
              <Flex w="full" align="center" justify="space-between">
                <Text fontSize={{ base: 'xl', md: '4xl' }}>Blog</Text>
                <TextIconCallToAction
                  label="Tüm Yazılar"
                  type="page"
                  page={{
                    slug: '/blogs',
                    name: 'Tüm Yazılar',
                    breadcrumbs: [],
                    meta: {}
                  }}
                  color="text.blue"
                  fontWeight="semibold"
                  icon={FiArrowRight}
                />
              </Flex>
            </AutoPosition>
            <Flex w="full" h="72" flexDir={{ base: 'column', md: 'row' }}>
              {blogs?.map((blog) => (
                <Flex
                  key={uuidv4()}
                  pos="relative"
                  boxSize="full"
                  overflow="hidden"
                >
                  <Image
                    alt={blog.featuredImage.alt}
                    src={blog.featuredImage.url}
                    objectFit="cover"
                    boxSize="full"
                  />
                  <VStack
                    align="stretch"
                    boxSize="full"
                    pos="absolute"
                    color="text.light"
                    py={{ base: '2', md: '6' }}
                    px={{ base: '6', md: '12' }}
                  >
                    {blog.category && (
                      <>
                        <Text fontSize="sm" fontWeight="bold">
                          {blog.category.name}
                        </Text>
                        <Spacer />
                        <Flex
                          w="full"
                          flexDir="column"
                          align="flex-start"
                          gap={3}
                        >
                          <Text
                            fontSize={{ base: 'md', md: 'lg' }}
                            fontWeight="bold"
                            textOverflow="ellipsis"
                          >
                            {blog.name}
                          </Text>
                          <ButtonCallToAction
                            label="Detaylı Bilgi"
                            type="page"
                            page={{
                              slug: `/blog/${blog.slug}`,
                              name: blog.name,
                              breadcrumbs: blog.breadcrumbs,
                              meta: blog.meta
                            }}
                          />
                        </Flex>
                      </>
                    )}
                  </VStack>
                </Flex>
              ))}
            </Flex>
          </VStack>
        </BackgroundColor>
      )}
      {successStories?.length > 0 && (
        <Template backgroundColor="background.primary" width="66.66%">
          <VStack spacing="8" align="stretch" w="full">
            <Flex w="full" align="center" justify="space-between">
              <Text fontSize={{ base: 'xl', md: '4xl' }}>
                Başarı Hikayeleri
              </Text>
              <TextIconCallToAction
                label="Tüm Hikayeler"
                type="page"
                page={{
                  slug: '/success-stories',
                  name: 'Başarı Hikayeleri',
                  breadcrumbs: [],
                  meta: {}
                }}
                color="text.blue"
                fontWeight="semibold"
                icon={FiArrowRight}
              />
            </Flex>
            <Flex w="full" flexDir={{ base: 'column', md: 'row' }}>
              {successStories.map((successStory) => (
                <UnstyledFlippableCard
                  key={uuidv4()}
                  type="post"
                  post={{
                    ...successStory,
                    slug: `/success-story/${successStory.slug}`
                  }}
                  blockType="flippableCard"
                />
              ))}
            </Flex>
          </VStack>
        </Template>
      )}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  defaultLocale
}) => {
  const [page, blog, successStory] = await Promise.all([
    getPageBySlug<PaginatedDocs<PageType>>({
      slug: 'home',
      locale,
      defaultLocale
    }),
    getCustomPageDataByCondition<PaginatedDocs<PostType>>({
      endpoint: `${locale}-blogs`,
      condition: '[group.slug][equals]=blog',
      locale,
      defaultLocale,
      limit: 2
    }),
    getCustomPageDataByCondition<PaginatedDocs<PostType>>({
      endpoint: 'posts',
      condition: '[group.slug][equals]=success-story',
      locale,
      defaultLocale,
      limit: 4
    })
  ]);

  return {
    props: {
      page: page.docs[0] || null,
      blogs: blog.docs,
      successStories: successStory.docs
    }
  };
};
