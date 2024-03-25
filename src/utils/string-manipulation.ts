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

export const convertToEnglishKebabCase = (value: string) => {
  const engChars: Record<string, string> = {
    Ğ: 'G',
    Ü: 'U',
    Ş: 'S',
    İ: 'I',
    Ö: 'O',
    Ç: 'C',
    ğ: 'g',
    ü: 'u',
    ş: 's',
    ı: 'i',
    ö: 'o',
    ç: 'c'
  };

  return [...value]
    .map((c) => engChars[c] || c)
    .join('')
    .replace(/ /g, '-')
    .replace(/[^a-zA-Z0-9/-]+/g, '')
    .toLowerCase();
};
