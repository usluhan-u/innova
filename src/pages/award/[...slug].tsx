import { GetStaticPaths, GetStaticProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { Flex } from '@chakra-ui/react';
import { AwardPostType } from '../../collections';
import { AutoPosition, BackgroundColor, Content } from '../../components';
import Custom404 from '../404';
import { getCustomPageDataBySlug, getList } from '../../api';

interface AwardPostProps {
  awardPost?: AwardPostType;
}

const AwardPost = ({ awardPost }: AwardPostProps) => {
  if (!awardPost) return <Custom404 />;

  return (
    <BackgroundColor bgColor={awardPost.backgroundColor}>
      <AutoPosition>
        <Flex w={{ base: 'full', md: awardPost.width }}>
          <Content
            blockType="content"
            columns={[{ content: awardPost.content, textAlign: 'left' }]}
          />
        </Flex>
      </AutoPosition>
    </BackgroundColor>
  );
};

export default AwardPost;

export const getStaticProps: GetStaticProps = async ({
  params,
  locale,
  defaultLocale
}) => {
  const slug = params?.slug ? (params.slug as string[]).join('/') : 'home';

  const awardPost = await getCustomPageDataBySlug<PaginatedDocs<AwardPostType>>(
    {
      endpoint: 'award-posts',
      slug,
      locale,
      defaultLocale
    }
  );

  return {
    props: {
      awardPost: awardPost.docs[0]
    },
    revalidate: 1
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const data = await getList<PaginatedDocs<AwardPostType>>({
    endpoint: 'award-posts'
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
