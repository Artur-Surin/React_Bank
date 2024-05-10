import React from "react";
import "./index.css"

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    type?: "submit" | "reset" | "button" | undefined;
    style?: React.CSSProperties;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({children, className = "", onClick, type = "button", style}) => {
    return (
        <button type={type} className={`button button--${className}`} onClick={onClick} style={{...style}}>
            {children}
        </button>
    )
}

export default Button;