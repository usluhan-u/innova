import React from 'react';
import { Center, Text } from '@chakra-ui/react';
// import { useRouter } from 'next/router';
import { ButtonCallToAction } from '../components';
import { NotFoundType } from '../globals';
// import { getCustomPageData } from '../api';

export interface NotFoundProps {
  notFound?: NotFoundType;
}

const Custom404 = () => {
  // const [notFound, setNotFound] = React.useState<NotFoundType | null>(null);

  // const router = useRouter();

  // React.useEffect(() => {
  //   const getData = async () => {
  //     const result = await getCustomPageData<NotFoundType>({
  //       endpoint: 'globals/not-found',
  //       locale: router.locale,
  //       defaultLocale: router.defaultLocale
  //     });

  //     setNotFound(result);
  //   };

  //   getData();
  // }, []);

  const notFound: NotFoundType = {
    title: 'Aradığınız sayfa bulunamadı',
    description: 'Üzgünüz, açmaya çalıştığınız sayfa yok ya da taşınmış.',
    callToAction: {
      type: 'page',
      label: 'Ana Sayfaya Geri Dön',
      page: {
        slug: 'home',
        name: 'Ana Sayfa',
        breadcrumbs: [],
        meta: {}
      }
    }
  };

  return (
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
      {!notFound && <Text>404 - Page is not found</Text>}
    </Center>
  );
};

export default Custom404;
