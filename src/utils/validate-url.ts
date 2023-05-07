export const validateUrl = (url: string): string | true => {
  const urlRegex =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

  const isValid = urlRegex.test(url);
  const result = isValid || 'Please enter a valid URL';

  return result;
};
