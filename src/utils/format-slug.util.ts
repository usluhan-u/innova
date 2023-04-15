import { FieldHook } from 'payload/types';

const format = (value: string) =>
  value
    .replace(/ /g, '-')
    .replace(/[^\w-/]+/g, '')
    .toLowerCase();

export const formatSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === 'string') {
      return format(value);
    }

    const fallbackData =
      (data && data[fallback]) || (originalDoc && originalDoc[fallback]);

    if (fallbackData && typeof fallbackData === 'string') {
      return format(fallbackData);
    }

    return value;
  };
