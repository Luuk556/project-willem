import React from "react";

interface CustomInputProps {
    label: string;
    type: "date" | "datetime-local" | "text" | "password" | "checkbox";
    defaultValue: string;
    onChange: (value: string) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ onChange, type = "text", label = "", defaultValue = "" }) => {
    return (
        <div className="custom-input">
            <label>{label}</label>
            <input
                type={type}
                onChange={(e) => onChange(e.target.value)}
                value={defaultValue}
            />
        </div>
    );
};

export default CustomInput;
