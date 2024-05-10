import React from "react";
import "./index.css"

interface InputField {
    type?: string,
    label?: string,
    style?: React.CSSProperties;
    placeholder?: string,
    name?: string,
    сlassName?: string,
    value?: string | number;
	showPass?: boolean;
    alert?: string,
	onPassVisibility?: () => void;
    onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field: React.FC<InputField> = ({label, type = "text", style, placeholder, name, value, showPass = false, alert, onPassVisibility, onInput }) => {

    const inputType = type === "password" && !showPass ? "password" : "text";
    
    return (
        <div className="field">
            <label className="field__label">{label}</label>

            <div className="field__input-wrapper">
                <input className="field__input" type={type === "number" ? "number" : inputType} placeholder={placeholder} name={name} value={value} onInput={onInput} style={{...style}}/>

                {type === "password" && (
                    <span className={showPass ? "on" : "off"} onClick={onPassVisibility}>
                    </span>

                )}
            </div>
            {alert && <div className="alert">{alert}</div>}
        </div>
    )
}

export default Field