export const increaseShade = (shade: number, increment: number) => {
  return Math.min(shade + increment, 9);
};

export const decreaseShade = (shade: number, decrement: number) => {
  return Math.min(shade - decrement, 0);
};
