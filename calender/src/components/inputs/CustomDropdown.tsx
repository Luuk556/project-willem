import React from "react";

interface CustomDropdownProps {
    label: string;
    defaultValue: any;
    onChange: (value: string) => void;
    values: any[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ onChange, label = "", defaultValue = "", values = [] }) => {
    return (
        <div className="custom-dropdown">
            <label>{label}</label>
            <select
                defaultValue={defaultValue}
                onChange={(e) => onChange(e.target.value)}
            >
                {values.map(val => {
                    return (
                        <option value={val} key={val}>{val}</option>
                    )
                })}
            </select>
        </div>
    );
};

export default CustomDropdown;
