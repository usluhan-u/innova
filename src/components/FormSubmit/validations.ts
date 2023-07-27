export const validateEmail = (value: unknown) => {
  const stringValue = value as string;

  return !!/\S+@\S+\.\S+/.test(stringValue);
};
