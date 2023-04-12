import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { ChakraProvider, chakra } from '@chakra-ui/react';
import { theme } from '../theme';
import { FooterType, SocialMediaType } from '../globals';
import { Footer } from '../components';

interface MyAppProps extends AppProps {
  socialMedia: SocialMediaType;
  footer: FooterType;
}

const MyApp = ({ Component, pageProps, socialMedia, footer }: MyAppProps) => (
  <ChakraProvider theme={theme}>
    <chakra.div minH="100vh" display="flex" flexDir="column">
      <Component {...pageProps} />
      <Footer socialMedia={socialMedia} footer={footer} marginTop="auto" />
    </chakra.div>
  </ChakraProvider>
);

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const [socialMediaQuery, footerQuery] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/social-media?locale=${appContext.ctx.locale}&fallback-locale=${appContext.ctx.defaultLocale}`
    ).then((res) => res.json()),
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/footer?locale=${appContext.ctx.locale}&fallback-locale=${appContext.ctx.defaultLocale}`
    ).then((res) => res.json())
  ]);

  return {
    ...appProps,
    socialMedia: socialMediaQuery,
    footer: footerQuery
  };
};
