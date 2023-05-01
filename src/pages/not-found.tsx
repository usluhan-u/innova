import { Center, Text } from '@chakra-ui/react';
import { GetStaticProps } from 'next';
import { ButtonCallToAction } from '../components';
import { NotFoundType } from '../globals';
import { getCustomPageData } from '../api';

export interface NotFoundProps {
  notFound?: NotFoundType;
}

const NotFound = ({ notFound }: NotFoundProps) => (
  <Center
    boxSize="full"
    flexDir="column"
    gap={2}
    flexGrow={1}
    bgColor="background.secondary"
  >
    {notFound?.title && (
      <Text color="text.primary" fontWeight="medium" fontSize={36}>
        {notFound?.description}
      </Text>
    )}
    {notFound?.description && (
      <Text color="text.secondary.100" fontWeight="normal" fontSize={20}>
        {notFound?.description}
      </Text>
    )}
    {notFound?.callToAction &&
      Object.keys(notFound?.callToAction).length > 0 && (
        <ButtonCallToAction {...notFound?.callToAction} />
      )}
    {!notFound?.title &&
      !notFound?.description &&
      notFound?.callToAction &&
      Object.keys(notFound?.callToAction).length === 0 && (
        <Text>404 - Page is not found</Text>
      )}
  </Center>
);

export default NotFound;

export const getStaticProps: GetStaticProps = async ({
  locale,
  defaultLocale
}) => {
  const notFound = await getCustomPageData<NotFoundType>({
    endpoint: 'globals/not-found',
    locale,
    defaultLocale
  });

  return {
    props: {
      notFound: notFound || null
    },
    revalidate: 1
  };
};
