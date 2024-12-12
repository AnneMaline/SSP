import Link from "next/link";
import React from "react";

interface TopTaskProps {
  text: string; // Text on the top task
  targetUrl: string; // target URL for navigation
  className?: string; // Optional className prop for customization
}

const TopTask = ({ text, targetUrl, className = "" }: TopTaskProps) => {
  return (
    <Link
      href={`${targetUrl}`}
      className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${className}`}
    >
      {text}
    </Link>
  );
};

export default TopTask;
