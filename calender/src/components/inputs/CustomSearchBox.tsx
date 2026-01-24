import React, { useState } from "react";

interface CustomSearchBoxProps {
    defaultValueId: number | null;
    onSelect: (id: number) => void;
    items: Map<number, string>;
    label: string;
}

const CustomSearchBox: React.FC<CustomSearchBoxProps> = ({ items, onSelect, defaultValueId = 0, label }) => {
    const [query, setQuery] = useState(items.get(defaultValueId || 0) || "");
    const [showResults, setShowResults] = useState(false);

    const filteredItems = Array.from(items.entries()).filter(([id, value]) =>
        value.toLowerCase().includes(query.toLowerCase())
    );

    const handleSelect = (id: number, value: string) => {
        setQuery(value);
        setShowResults(false);
        onSelect(id);
    };

    return (
        <div className="custom-search-box">
            <label>{label}</label>
            <input
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowResults(true);
                }}
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 100)}
            />

            {showResults && filteredItems.length > 0 && (
                <ul className="custom-search-results">
                    {filteredItems.map(([id, value]) => (
                        <li
                            key={id}
                            onMouseDown={() => handleSelect(id, value)}
                            className="custom-search-item"
                        >
                            {value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSearchBox;
