import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '../styles/globals.css';
import React from 'react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { Box, ChakraProvider, Flex, useMediaQuery } from '@chakra-ui/react';
import { PaginatedDocs } from 'payload/dist/mongoose/types';
import { Router } from 'next/router';
import { theme } from '../theme';
import { FooterType, MenuType, SocialMediaType } from '../globals';
import { Footer, Form, Header } from '../components';
import { getCustomPageData, getCustomPageDataByCondition } from '../api';
import { ExtendedFormBuilder } from '../blocks';
import { DataProvider, LanguageProvider } from '../contexts';

interface MyAppProps extends AppProps {
  socialMedia: SocialMediaType;
  footer: FooterType;
  menu: MenuType;
  floatForm: ExtendedFormBuilder | null;
}

const MyApp = ({
  Component,
  pageProps,
  socialMedia,
  footer,
  menu,
  floatForm
}: MyAppProps) => {
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  React.useEffect(() => {
    const handleRouteChange = () => scrollToTop();

    Router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <LanguageProvider>
        <DataProvider>
          <Flex minH="100vh" flexDir="column">
            <Header menu={menu} form={floatForm} />
            <Component {...pageProps} flexGrow={1} />
            <Box w="full" h="10" />
            <Footer
              socialMedia={socialMedia}
              footer={footer}
              marginTop="auto"
            />
            {floatForm && isLargerThanMd && (
              <Form
                backgroundColor="background.primary"
                width="100%"
                form={floatForm}
              />
            )}
          </Flex>
        </DataProvider>
      </LanguageProvider>
    </ChakraProvider>
  );
};

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const [socialMedia, footer, menu, floatForm] = await Promise.all([
    getCustomPageData<SocialMediaType>({
      endpoint: 'globals/social-media',
      locale: appContext.ctx.locale,
      defaultLocale: appContext.ctx.defaultLocale
    }),
    getCustomPageData<FooterType>({
      endpoint: 'globals/footer',
      locale: appContext.ctx.locale,
      defaultLocale: appContext.ctx.defaultLocale
    }),
    getCustomPageData<MenuType>({
      endpoint: 'globals/menu',
      locale: appContext.ctx.locale,
      defaultLocale: appContext.ctx.defaultLocale
    }),
    getCustomPageDataByCondition<PaginatedDocs<ExtendedFormBuilder>>({
      endpoint: 'forms',
      condition: '[type][equals]=float',
      locale: appContext.ctx.locale,
      defaultLocale: appContext.ctx.defaultLocale
    })
  ]);

  return {
    ...appProps,
    socialMedia,
    footer,
    menu,
    floatForm: floatForm.totalDocs > 0 ? floatForm.docs[0] : null
  };
};
