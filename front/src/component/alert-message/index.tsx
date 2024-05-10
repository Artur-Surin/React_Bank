import React from "react";
import "./index.css"

interface AlertMessage {
    children: React.ReactNode;
    className ?: string;
    style ?: React.CSSProperties;
}

const Alert: React.FC<AlertMessage>= ({children, className, style = {}}) => {
    return(
        <div className={`alert ${className}`} style={{...style}}>
            <span className="alert__icon"></span>
            {children}
        </div>
    )
}

export default Alert;