import React from "react";
import "./RippleButton.css";

const RippleButton = ({ children, className, ...props }) => {
  const handleRipple = (e) => {
    if (e.target !== e.currentTarget) return;

    const button = e.currentTarget;

    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "ripple";

    button.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  };

  return (
    <button
      type="button"
      className={`ripple-container ${className}`}
      onClick={handleRipple}
      {...props}
    >
      {children}
    </button>
  );
};

export default RippleButton;
