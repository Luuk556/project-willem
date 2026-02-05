import React from "react";

interface CustomCheckboxProps {
    label: string;
    defaultValue: boolean;
    onChange: (value: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ onChange, label = "", defaultValue = false }) => {
    console.log(defaultValue)
    return (
        <div className="custom-input">
            <label>{label}</label>
            <input
                className="custom-checkbox"
                type="checkbox"
                onChange={(e) => onChange(e.target.checked)}
                checked={defaultValue}
            />
        </div>
    );
};

export default CustomCheckbox;
