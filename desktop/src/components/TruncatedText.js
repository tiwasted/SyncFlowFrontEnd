import React, { useState } from 'react';

const TruncatedText = ({ text, limit }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const truncatedText = text.length > limit ? text.slice(0, limit) + "..." : text;

    return (
        <span>
            {isExpanded ? text : truncatedText}
            {text.length > limit && (
                <span onClick={toggleExpansion} style={{ color: 'blue', cursor: 'pointer' }}>
                    {isExpanded ? ' Свернуть' : ' Читать дальше'}
                </span>
            )}
        </span>
    );
};

export default TruncatedText;
