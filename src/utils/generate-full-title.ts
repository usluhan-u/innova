import { Breadcrumb } from '@payloadcms/plugin-nested-docs/dist/types';

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
