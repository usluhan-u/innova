import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { theme } from '../theme';

interface MyAppProps extends AppProps {}

const MyApp = ({ Component, pageProps }: MyAppProps) => (
  <ChakraProvider theme={theme}>
    <Component {...pageProps} />
  </ChakraProvider>
);

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return {
    ...appProps
  };
};
