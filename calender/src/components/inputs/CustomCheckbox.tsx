import React from "react";

interface CustomCheckboxProps {
    label: string;
    defaultValue: string;
    onChange: (value: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ onChange, label = "", defaultValue = "false" }) => {
    return (
        <div className="custom-input">
            <label>{label}</label>
            <input
                className="custom-checkbox"
                type="checkbox"
                onChange={(e) => onChange(e.target.value == "true")}
                value={defaultValue}
            />
        </div>
    );
};

export default CustomCheckbox;
