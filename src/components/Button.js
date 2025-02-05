import React from 'react';
import Link from "next/link";

const Button = (props) => {
    const {href, children, ...rest} = props;
    return (
        href ? <Link
            href={href}
            {...rest}
        >
            {children}
        </Link> : <button
            type="button"
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;