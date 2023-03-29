export const isObject = (item: unknown): boolean =>
  !!item && typeof item === 'object' && !Array.isArray(item);

export const deepMerge = <T extends object, R extends object>(
  target: any,
  source: any
): T => {
  const output = { ...target };

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }

  return output;
};
