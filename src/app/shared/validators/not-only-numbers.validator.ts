export const notOnlyNumbers = (value: string): boolean => {
  const string = value.trim() || '';

  return /^\d+$/.test(string);
};
