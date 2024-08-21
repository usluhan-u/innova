import React from 'react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import NextHead from 'next/head';

export interface HeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const {
  publicRuntimeConfig: { SERVER_URL }
} = getConfig();

const DEFAULT_DESCRIPTION = 'İnnova, Uçtan Uca Kurumsal Çözümler';
const DEFAULT_TITLE = 'İnnova';
const TITLE_SUFFIX = ' | İnnova';
const DEFAULT_OG_IMAGE = `${SERVER_URL}/images/og-image.jpg`;
const DEFAULT_KEYWORDS = 'İnnova, Ürünler, Çözümler, Hizmetler';

export const Head = ({
  title,
  description,
  keywords,
  ogImage,
  noIndex
}: HeadProps) => {
  const { asPath } = useRouter();

  const getTitle = () =>
    title ? `${title}${TITLE_SUFFIX}` : `${DEFAULT_TITLE}${TITLE_SUFFIX}`;

  return (
    <NextHead>
      <title>{getTitle()}</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <meta name="description" content={description || DEFAULT_DESCRIPTION} />
      <meta name="keywords" content={keywords || DEFAULT_KEYWORDS} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {noIndex && <meta name="robots" content="noindex" />}
      <meta name="robots" content="index, follow" />
      <meta property="og:url" content={`${SERVER_URL}${asPath}`} />
      <meta property="og:title" content={title || DEFAULT_TITLE} />
      <meta
        property="og:description"
        content={description || DEFAULT_DESCRIPTION}
      />
      <meta property="twitter:title" content={title || DEFAULT_TITLE} />
      <meta name="twitter:site" content="@innovabilisim" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage || DEFAULT_OG_IMAGE} />
      <meta property="og:image" content={ogImage || DEFAULT_OG_IMAGE} />
      <meta
        name="google-site-verification"
        content="MLx7Q3Wl8XnAk7z_aYxoKcJKVyBvWEqg0sgdpFX_-mk"
      />
      <meta
        name="facebook-domain-verification"
        content="jvxsmlnarbuoj51ref96avkbtzbt4z"
      />
    </NextHead>
  );
};
