import React, { useEffect, useState } from "react";

const LoadingSpinner = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
  };

  const finalText = "1 2 3 Beatbox!";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let interval;
    let iteration = 0;

    interval = setInterval(() => {
      setDisplayText(() => {
        if (iteration > finalText.length) {
          clearInterval(interval);
          return finalText;
        }

        const newText = finalText.slice(0, iteration);
        iteration++;
        return newText;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <p className={`${sizeClasses[size]} font-poppins text-gray-400`}>
        {displayText}
      </p>
    </div>
  );
};

export default LoadingSpinner;
