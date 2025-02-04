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
      position: "top-center",
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      ...options,
    });
  },
  error: (message, options = {}) => {
    toast.error(message, {
      position: "top-center",
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      ...options,
    });
  },
  info: (message, options = {}) => {
    toast(message, {
      position: "top-center",
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
      icon: "ℹ️",
      ...options,
    });
  },
};

export default Toast;