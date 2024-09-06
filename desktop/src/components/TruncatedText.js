import React, { useState } from "react";
import "../styles/TruncatedText.css";

const TruncatedText = ({ text, limit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const truncatedText =
    text.length > limit ? text.slice(0, limit) + "..." : text;

  return (
    <div className="truncated-text-container">
      <span className="truncated-text-content">
        {isExpanded ? text : truncatedText}
      </span>
      {text.length > limit && (
        <span
          onClick={toggleExpansion}
          className={`truncated-text-toggle ${
            isExpanded ? "collapsed" : "expanded"
          }`}
        >
          {isExpanded ? " Свернуть" : " Читать дальше"}
        </span>
      )}
    </div>
  );
};

export default TruncatedText;
