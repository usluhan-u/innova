export const convertToPascalCase = (value: string) =>
  value.replace(
    /([a-zA-Z0-9ğüşıöçĞÜŞİÖÇ_])([a-zA-Z0-9ğüşıöçĞÜŞİÖÇ_]*)/g,
    (_, arg1, arg2) => arg1.toUpperCase() + arg2.toLowerCase()
  );

export const convertToKebabCase = (value: string) =>
  value
    .replace(/ /g, '-')
    .replace(/[^a-zA-Z0-9ğüşıöçĞÜŞİÖÇ/-]+/g, '')
    .toLowerCase();
