export const generateFullTitle = (breadcrumbs: { label: string }[]) => {
  if (Array.isArray(breadcrumbs)) {
    return breadcrumbs.reduce(
      (title, breadcrumb, index) =>
        index === 0 ? breadcrumb.label : `${title} > ${breadcrumb.label}`,
      ''
    );
  }

  return undefined;
};
