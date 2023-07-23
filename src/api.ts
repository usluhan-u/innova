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
  try {
    const query = await fetch(
      `${BASE_URL}/${endpoint}?locale=${locale}&fallback-locale=${defaultLocale}&where[slug][equals]=${slug}`
    );

    const data: T = await query.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(JSON.stringify(error));
    }

    throw new Error('An error occurred');
  }
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
  try {
    const query = await fetch(
      `${BASE_URL}/${endpoint}?locale=${locale}&fallback-locale=${defaultLocale}`
    );

    const data: T = await query.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(JSON.stringify(error));
    }

    throw new Error('An error occurred');
  }
};

export const getCustomPageDataByCondition = async <T>({
  endpoint,
  condition,
  locale,
  defaultLocale,
  limit,
  page,
  sortBy,
  sortOrder
}: {
  endpoint: string;
  condition: string;
  locale?: string;
  defaultLocale?: string;
  limit?: number;
  page?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}) => {
  try {
    const query = await fetch(
      `${BASE_URL}/${endpoint}?locale=${locale}&fallback-locale=${defaultLocale}&limit=${limit}&page=${page}&sort=${
        sortOrder === 'desc' && '-'
      }${sortBy}&where${condition}`
    );

    const data: T = await query.json();

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(JSON.stringify(error));
    }

    throw new Error('An error occurred');
  }
};
