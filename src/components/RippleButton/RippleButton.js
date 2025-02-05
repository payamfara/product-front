import React from "react";
import "./RippleButton.css";
import Link from "next/link";
import Button from "../Button";

const RippleButton = (props) => {
    const {children, className, ...rest} = props;

    const handleRipple = (e) => {
        // if (e.target !== e.currentTarget) return;

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
        <Button
            className={`ripple-container ${className}`}
            onClick={handleRipple}
            {...rest}
        >
            {children}
        </Button>
    );
};

export default RippleButton;
