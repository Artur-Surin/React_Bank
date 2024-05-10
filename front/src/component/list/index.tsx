import React from "react";
import "./index.css";

interface ListProps {
    info?: string;
    details?: string;
    className?: string;
    style?: React.CSSProperties;
    title?: string;
    notificationInfo?: string;
    onItemClick?: () => void;
}

const List: React.FC<ListProps> = ({info, details, className = "", style = {}, title = "", notificationInfo, onItemClick}) => {
    return(
        <div className="item" onClick={onItemClick}>
            <div className={`item__icon ${className}`}></div>
            <div className="item__content">
                <div className="item__title-block">
                <h1 className="item__title">{title}</h1>
                    { notificationInfo 
                        ? <p className="notificationInfo">{notificationInfo}</p>
                        : null
                    }
                    { details 
                        ? <p className="details">{details}</p>
                        : null
                    }
                </div>
            <div className="item__info" style={{...style}}>{info}</div>
        </div>
    </div>
    )
}

export default List;