import React from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";

interface backButton {
    path?: string;
}

const ArrowBack: React.FC<backButton> = ({ path = ""}) => {

    const navigate = useNavigate()

    return(
        <span style={{display: "inline"}}>
            <img onClick={() => path ? navigate(path) : navigate(-1)}
                 src="/svg/back-arrow.svg"
                 alt="back button"
                className="arrow-back__image"/>
        </span>
    ) 
}

export default ArrowBack;