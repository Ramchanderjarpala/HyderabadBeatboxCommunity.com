import React from "react";

const ImageSkeleton = ({ width = "w-[300px]", height = "h-[400px]" }) => {
  return (
    <div
      className={`${width} ${height} bg-gray-800 rounded-xl overflow-hidden animate-pulse`}
    >
      <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
    </div>
  );
};

export default ImageSkeleton;
