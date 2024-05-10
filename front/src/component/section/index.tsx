import React from "react";
import "./index.css";

interface sectionPorps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
}

const Section: React.FC<sectionPorps> = ({children}) => {
    return (
        <section className="section-wrapper">
            {children}
        </section>
    )
}

export default Section;