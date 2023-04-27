import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { SERVER_URL } = publicRuntimeConfig;

export const getPageBySlug = async <T>({
  slug,
  locale,
  defaultLocale
}: {
  slug: string;
  locale?: string;
  defaultLocale?: string;
}) => {
  const query = await fetch(
    `${SERVER_URL}/api/pages?where[slug][equals]=${slug}&locale=${locale}&fallbackLocale=${defaultLocale}`
  );

  const data: T = await query.json();

  return data;
};

export const getCustomPageData = async <T>({
  endpoint,
  locale,
  defaultLocale
}: {
  endpoint: string;
  locale?: string;
  defaultLocale?: string;
}) => {
  const query = await fetch(
    `${SERVER_URL}/api/${endpoint}?locale=${locale}&fallbackLocale=${defaultLocale}`
  );

  const data: T = await query.json();

  return data;
};

export const getCustomPageDataBySlug = async <T>({
  endpoint,
  slug,
  locale,
  defaultLocale
}: {
  endpoint: string;
  slug: string;
  locale?: string;
  defaultLocale?: string;
}) => {
  const query = await fetch(
    `${SERVER_URL}/api/${endpoint}?where[slug][equals]=${slug}&locale=${locale}&fallbackLocale=${defaultLocale}`
  );

  const data: T = await query.json();

  return data;
};

export const getList = async <T>({ endpoint }: { endpoint: string }) => {
  const query = await fetch(`${SERVER_URL}/api/${endpoint}`);

  const data: T = await query.json();

  return data;
};
