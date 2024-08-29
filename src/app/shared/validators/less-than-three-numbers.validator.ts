export const lessThanThreeNumbers = (value: string): boolean => {
  const string = value.trim() || '';

  const digitsCount = (string.match(/\d/g) || []).length;

  return digitsCount > 3;
};
