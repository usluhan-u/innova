import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '../styles/globals.css';
import React from 'react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { theme } from '../theme';
import { FooterType, MenuType, SocialMediaType } from '../globals';
import { Footer, Header } from '../components';
import { getCustomPageData } from '../api';

interface MyAppProps extends AppProps {
  socialMedia: SocialMediaType;
  footer: FooterType;
  menu: MenuType;
}

const MyApp = ({
  Component,
  pageProps,
  socialMedia,
  footer,
  menu
}: MyAppProps) => (
  <ChakraProvider theme={theme}>
    <Flex minH="100vh" flexDir="column">
      <Header menu={menu} />
      <Component {...pageProps} flexGrow={1} />
      <Footer socialMedia={socialMedia} footer={footer} marginTop="auto" />
    </Flex>
  </ChakraProvider>
);

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const [socialMedia, footer, menu] = await Promise.all([
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
    })
  ]);

  return {
    ...appProps,
    socialMedia,
    footer,
    menu
  };
};
