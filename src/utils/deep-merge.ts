/* eslint-disable @typescript-eslint/no-explicit-any */
export function isObject(item?: unknown): boolean {
  if (item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  return false;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const deepMerge = <T extends object, R>(target: any, source: any): T => {
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
