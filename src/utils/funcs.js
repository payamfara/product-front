export const getFirstLetters = (input) => {
  const words = input.trim().split(/\s+/);
  const firstLetters = words.map((word) => word.charAt(0)).join("‌");
  return firstLetters;
};
