import React from "react";
import "./index.css";

interface accountHeaderProps {
    title?: string;
    path?: string;
    children?: React.ReactNode
}

const AccountHeader: React.FC<accountHeaderProps> = ({path, title, children}) => {
    return (
        <div className="header">
            {children}
            <h1 className="title">{title}</h1>
        </div>
    )
}

export default AccountHeader;