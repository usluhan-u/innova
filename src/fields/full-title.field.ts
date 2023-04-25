import { Breadcrumb } from '@payloadcms/plugin-nested-docs/dist/types';
import { Field, FieldHook } from 'payload/types';

export const generateFullTitle = (breadcrumbs: Breadcrumb[]) => {
  if (Array.isArray(breadcrumbs)) {
    return breadcrumbs.reduce(
      (title, breadcrumb, index) =>
        index === 0 ? breadcrumb.label : `${title} > ${breadcrumb.label}`,
      ''
    );
  }

  return undefined;
};

const populateFullTitle: FieldHook = async ({ data, originalDoc }) =>
  generateFullTitle(data?.breadcrumbs || originalDoc?.breadcrumbs);

export const FullTitle: Field = {
  name: 'fullTitle',
  type: 'text',
  localized: true,
  hooks: {
    beforeChange: [populateFullTitle]
  },
  admin: {
    components: {
      Field: () => null
    }
  }
};
