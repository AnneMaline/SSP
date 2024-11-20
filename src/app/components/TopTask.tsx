// src/components/Button.tsx
"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

interface TopTaskProps {
  text: string; // Text on the top task
  targetUrl: string; // target URL for navigation
  className?: string; // Optional className prop for customization
}

const TopTask: React.FC<TopTaskProps> = ({
  text,
  targetUrl,
  className = "",
}) => {
  const searchParams = useSearchParams(); // Access the current search parameters
  return (
    <Link
      href={`${targetUrl}?${searchParams}`}
      className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${className}`}
    >
      {text}
    </Link>
  );
};

export default TopTask;
