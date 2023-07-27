import React from 'react';
import { Center, Text } from '@chakra-ui/react';
import { ButtonCallToAction } from '../components';
import { NotFoundType } from '../globals';

export interface NotFoundProps {
  notFound?: NotFoundType;
}

const Custom404 = () => {
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
        meta: {},
        localizedSlugs: {}
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
