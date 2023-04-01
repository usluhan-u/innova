import NextHead from 'next/head';
import getConfig from 'next/config';
import { useRouter } from 'next/router';

const {
  publicRuntimeConfig: { SERVER_URL }
} = getConfig();

const defaultDescription = 'İnnova, Uçtan Uca Kurumsal Çözümler';
const defaultTitle = 'İnnova';
const titleSuffix = ' | İnnova';
const defaultOGImage = `${SERVER_URL}/images/og-image.jpg`;
const defaultKeywords = 'İnnova, Ürünler, Çözümler, Hizmetler';

type HeadProps = {
  title?: string;
  description?: string;
  ogImage?: string;
  keywords?: string;
};

export const Head = ({ title, description, ogImage, keywords }: HeadProps) => {
  const { asPath } = useRouter();

  const getTitle = () =>
    title ? title + titleSuffix : defaultTitle + titleSuffix;

  return (
    <NextHead>
      <title>{getTitle()}</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta property="og:url" content={`${SERVER_URL}${asPath}`} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:site" content="@payloadcms" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage || defaultOGImage} />
      <meta property="og:image" content={ogImage || defaultOGImage} />
    </NextHead>
  );
};
