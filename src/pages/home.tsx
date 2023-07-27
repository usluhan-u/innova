import React from 'react';
import { GetServerSideProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { v4 as uuidv4 } from 'uuid';
import {
  Flex,
  Image,
  Spacer,
  Text,
  VStack,
  useMediaQuery
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { PageType, PostType } from '../collections';
import Custom404 from './404';
import {
  AutoPosition,
  BackgroundColor,
  ButtonCallToAction,
  Head,
  Hero,
  Overlay,
  RenderBlocks,
  Template,
  TextIconCallToAction,
  UnstyledFlippableCard
} from '../components';
import { getCustomPageDataByCondition, getPageBySlug } from '../api';
import { useData } from '../contexts';

export interface HomeProps {
  page?: PageType;
  blogs: PostType[];
  successStories: PostType[];
}

const Home = ({ page, blogs, successStories }: HomeProps) => {
  const { setLocalizedSlugs } = useData();
  const router = useRouter();
  const [isLargerThanXL] = useMediaQuery('(min-width: 1300px)');

  React.useEffect(() => {
    if (setLocalizedSlugs && typeof setLocalizedSlugs === 'function')
      setLocalizedSlugs(page?.localizedSlugs || {});
  }, [page, setLocalizedSlugs]);

  if (!page) return <Custom404 />;

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
                  label={router.locale === 'tr' ? 'Tüm Yazılar' : 'All Posts'}
                  type="page"
                  page={{
                    slug: '/blogs',
                    name: 'Tüm Yazılar',
                    breadcrumbs: [],
                    meta: {},
                    localizedSlugs: {}
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
                  <Overlay>
                    <Image
                      alt={blog.featuredImage.alt}
                      src={blog.featuredImage.url}
                      objectFit="cover"
                      boxSize="full"
                    />
                  </Overlay>
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
                            label={
                              router.locale === 'tr'
                                ? 'Detaylı Bilgi'
                                : 'Read More'
                            }
                            type="page"
                            page={{
                              slug: `/blog/${blog.slug}`,
                              name: blog.name,
                              breadcrumbs: blog.breadcrumbs,
                              meta: blog.meta,
                              localizedSlugs: blog.localizedSlugs
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
        <Template
          backgroundColor="background.primary"
          width={isLargerThanXL ? '75%' : '85%'}
        >
          <VStack spacing="8" align="stretch" w="full">
            <Flex w="full" align="center" justify="space-between">
              <Text fontSize={{ base: 'xl', md: '4xl' }}>
                {router.locale === 'tr'
                  ? 'Başarı Hikayeleri'
                  : 'Success Stories'}
              </Text>
              <TextIconCallToAction
                label={router.locale === 'tr' ? 'Tüm Hikayeler' : 'All Stories'}
                type="page"
                page={{
                  slug: '/success-stories',
                  name:
                    router.locale === 'tr'
                      ? 'Başarı Hikayeleri'
                      : 'Success Stories',
                  breadcrumbs: [],
                  meta: {},
                  localizedSlugs: {}
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
  params,
  locale,
  defaultLocale
}) => {
  const slug =
    params?.slug && Array.isArray(params.slug) ? params.slug.join('/') : 'home';

  const [page, blog, successStory] = await Promise.all([
    getPageBySlug<PaginatedDocs<PageType>>({
      slug,
      locale,
      defaultLocale
    }),
    getCustomPageDataByCondition<PaginatedDocs<PostType>>({
      endpoint: `${locale}-blogs`,
      condition: '[group.slug][equals]=blog',
      locale,
      defaultLocale,
      limit: 2,
      sortBy: 'publishDate',
      sortOrder: 'desc'
    }),
    getCustomPageDataByCondition<PaginatedDocs<PostType>>({
      endpoint: 'posts',
      condition: '[group.slug][equals]=success-story',
      locale,
      defaultLocale,
      limit: 4,
      sortBy: 'publishDate',
      sortOrder: 'desc'
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
