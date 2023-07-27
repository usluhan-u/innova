import { FieldHook, GlobalBeforeReadHook } from 'payload/types';
import {
  convertToKebabCase,
  convertToPascalCase,
  generateFullTitle
} from './utils';

export const populateFullTitle: FieldHook = ({ data, originalDoc }) =>
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

export const populateDocWithLocalizedSlugs: GlobalBeforeReadHook = async ({
  doc
}) => {
  // eslint-disable-next-line no-param-reassign
  doc.localizedSlugs = doc.slug;

  return doc;
};
