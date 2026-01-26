import React from "react";

interface CustomTextDisplayProps {
    label: string;
    value: string;
}

const CustomTextDisplay: React.FC<CustomTextDisplayProps> = ({ label = "", value = "" }) => {
    return (
        <div className="custom-input">
            <label>{label}</label>
            <p>{value}</p>
        </div>
    );
};

export default CustomTextDisplay;
