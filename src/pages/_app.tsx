import '../styles/globals.css';
import { Header } from '../components';
import { theme } from '../theme';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { Menu as MenuType } from '../payload-types';

interface MyAppProps extends AppProps {
  menuList: MenuType[];
}

export default function MyApp({ Component, pageProps, menuList }: MyAppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header menuList={menuList} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const [menuQuery] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/menus?limit=100&locale=${appContext.ctx.locale}&fallback-locale=${appContext.ctx.defaultLocale}`
    ).then((res) => res.json())
  ]);

  return {
    ...appProps,
    menuList: menuQuery.docs
  };
};
