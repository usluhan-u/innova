import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet';
import { theme } from '../theme';
import { Header } from '../components';
import { ScriptType } from '../globals';
import { MenuType } from '../collections';

interface MyAppProps extends AppProps {
  menuList: MenuType[];
  externalScripts: string[];
}

const MyApp = ({
  Component,
  pageProps,
  menuList,
  externalScripts
}: MyAppProps) => (
  <ChakraProvider theme={theme}>
    <Helmet>
      {externalScripts.map((script) => (
        <script key={uuidv4()} dangerouslySetInnerHTML={{ __html: script }} />
      ))}
    </Helmet>
    <Header menuList={menuList} />
    <Component {...pageProps} />
  </ChakraProvider>
);

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const [menuQuery, scriptsQuery] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/menus?limit=100&locale=${appContext.ctx.locale}&fallback-locale=${appContext.ctx.defaultLocale}`
    ).then((res) => res.json()),
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/globals/scripts?limit=100`
    ).then((res) => res.json()) as Promise<ScriptType | undefined>
  ]);

  return {
    ...appProps,
    menuList: menuQuery.docs,
    externalScripts: scriptsQuery?.scripts?.map((script) => script.script)
  };
};
