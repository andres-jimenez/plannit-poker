export const notSpecialCharacters = (value: string) => {
  return !/^[^_.*#\\/-]*$/.test(value);
};
