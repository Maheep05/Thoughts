import React, { FC } from "react";

interface LoadingProps {
  size?: "small" | "medium" | "large";
}

const Loading: FC<LoadingProps> = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} border-4 border-gray-200 border-t-black rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loading;
