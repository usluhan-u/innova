import { FieldHook } from 'payload/types';
import {
  convertToKebabCase,
  convertToPascalCase,
  generateFullTitle
} from './utils';

export const populateFullTitle: FieldHook = async ({ data, originalDoc }) =>
  generateFullTitle(data?.breadcrumbs || originalDoc?.breadcrumbs);

export const populateValueAfterCaseChange =
  (value: string): FieldHook =>
  ({ data, originalDoc }) =>
    convertToPascalCase(data?.[value] || originalDoc?.[value] || '');

export const populateSlug =
  (fallback: string): FieldHook =>
  ({ value, originalDoc, data }) => {
    if (typeof value === 'string') {
      return convertToKebabCase(value);
    }

    const fallbackData =
      (data && data[fallback]) || (originalDoc && originalDoc[fallback]);

    if (fallbackData && typeof fallbackData === 'string') {
      return convertToKebabCase(fallbackData);
    }

    return value;
  };
