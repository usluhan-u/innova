export const convertToPascalCase = (value: string) =>
  value.replace(
    /(\w)(\w*)/g,
    (_, arg1, arg2) => arg1.toUpperCase() + arg2.toLowerCase()
  );

export const convertToKebabCase = (value: string) =>
  value
    .replace(/ /g, '-')
    .replace(/[^\w-/]+/g, '')
    .toLowerCase();
