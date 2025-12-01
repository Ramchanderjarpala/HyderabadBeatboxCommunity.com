import React, { useEffect, useState } from "react";
import "../index.css";

const LoadingSpinner = () => {
  return (
    <div className="font-4xl bg-gradient-to-r from-black via-white to-black bg-[200%] bg-[length:200%_200%] bg-clip-text text-transparent [text-fill-color:transparent] animate-gradient-loader [-webkit-text-fill-color:transparent] [-webkit-background-clip:text]">
      3 2 1 Beatbox...
    </div>
  );
};

export default LoadingSpinner;
