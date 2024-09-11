export const checkNumber = (value: string | number) => {
  let n: number = parseInt(value as string);

  if (isNaN(n)) n = 0;

  if (n < 0) n = 0;

  return n;
};
