import isUrlHttp from 'is-url-http';

export const validateUrl = (url: string): string | true => {
  const isValid = isUrlHttp(url);
  const result = isValid || 'Please enter a valid URL';

  return result;
};
