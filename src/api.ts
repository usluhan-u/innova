const BASE_URL = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api`;

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
    `${BASE_URL}/${endpoint}?locale=${locale}&fallbackLocale=${defaultLocale}&where[slug][equals]=${slug}`
  );

  const data: T = await query.json();

  return data;
};

export const getPageBySlug = async <T>({
  slug,
  locale,
  defaultLocale
}: {
  slug: string;
  locale?: string;
  defaultLocale?: string;
}) =>
  getCustomPageDataBySlug<T>({
    endpoint: 'pages',
    slug,
    locale,
    defaultLocale
  });

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
    `${BASE_URL}/${endpoint}?locale=${locale}&fallbackLocale=${defaultLocale}`
  );

  const data: T = await query.json();

  return data;
};

export const getCustomPageDataByCondition = async <T>({
  endpoint,
  condition,
  locale,
  defaultLocale
}: {
  endpoint: string;
  condition: string;
  locale?: string;
  defaultLocale?: string;
}) => {
  const query = await fetch(
    `${BASE_URL}/${endpoint}?locale=${locale}&fallbackLocale=${defaultLocale}&where${condition}`
  );

  const data: T = await query.json();

  return data;
};
