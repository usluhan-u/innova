import { GetStaticPaths, GetStaticProps } from 'next';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { Flex } from '@chakra-ui/react';
import { AwardPostType } from '../../collections';
import { AutoPosition, BackgroundColor, Content } from '../../components';
import Custom404 from '../404';

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

  const awardPostQuery = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/award-posts?where[slug][equals]=${slug}&locale=${locale}&fallbackLocale=${defaultLocale}`
  );

  const awardPost: PaginatedDocs<AwardPostType> = await awardPostQuery.json();

  return {
    props: {
      awardPost: awardPost.docs[0]
    },
    revalidate: 1
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const request = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/award-posts`
  );
  const data: PaginatedDocs<AwardPostType> = await request.json();

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
