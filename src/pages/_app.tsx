import { Header } from '../components';
import '../styles/globals.css';
import { theme } from '../theme';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { MenuType } from '../collections';

interface MyAppProps extends AppProps {
  menus: MenuType[];
}

export default function MyApp({ Component, pageProps, menus }: MyAppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Header menus={menus} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  // const [menus] = await Promise.all([
  //   fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/collections/menus`).then(
  //     (res) => res.json()
  //   )
  // ]);

  return {
    ...appProps
    // menus
  };
};
