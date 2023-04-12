import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import { theme } from '../theme';
import { FooterType, MenuType, SocialMediaType } from '../globals';
import { Footer, Header } from '../components';

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
      <Component {...pageProps} />
      <Footer socialMedia={socialMedia} footer={footer} />
    </Flex>
  </ChakraProvider>
);

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const [socialMediaQuery, footerQuery, menuQuery] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/social-media?locale=${appContext.ctx.locale}&fallback-locale=${appContext.ctx.defaultLocale}`
    ).then((res) => res.json()),
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/footer?locale=${appContext.ctx.locale}&fallback-locale=${appContext.ctx.defaultLocale}`
    ).then((res) => res.json()),
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/menu?locale=${appContext.ctx.locale}&fallback-locale=${appContext.ctx.defaultLocale}`
    ).then((res) => res.json())
  ]);

  return {
    ...appProps,
    socialMedia: socialMediaQuery,
    footer: footerQuery,
    menu: menuQuery
  };
};
