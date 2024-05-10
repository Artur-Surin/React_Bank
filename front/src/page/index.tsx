import React from "react";
import "./index.css";

interface PageProps {
    children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({children}) => {
    return (
        <div style={{padding: "25px"}}>
            <div className="wrapper"> 
                {children}
            </div>
        </div>
    )
}

export default Page;