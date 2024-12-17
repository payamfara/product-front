import { createRoot } from "react-dom/client";

export const replaceComponent = (container, component) => {
  const customContainer = document.querySelector(container);
  const root = createRoot(customContainer);
  root.render(component);
};

export const getFirstLetters = (input) => {
  const words = input.trim().split(/\s+/);
  const firstLetters = words.map((word) => word.charAt(0)).join("‌");
  return firstLetters;
};
