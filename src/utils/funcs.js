import { toast } from "react-hot-toast";

export const getFirstLetters = (input) => {
  const words = input.trim().split(/\s+/);
  const firstLetters = words.map((word) => word.charAt(0)).join("‌");
  return firstLetters;
};

export const mediaUrl = (media) => `${process.env.NEXT_PUBLIC_API_URL}${media}`;


const Toast = {
  success: (message, options = {}) => {
    toast.success(message, {
      position: "bottom-center",
      ...options,
    });
  },
  error: (message, options = {}) => {
    toast.error(message, {
      position: "bottom-center",
      ...options,
    });
  },
  info: (message, options = {}) => {
    toast(message, {
      position: "bottom-center",
      icon: "ℹ️",
      ...options,
    });
  },
};

export default Toast;