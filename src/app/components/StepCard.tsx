import React from "react";

type CardProps = {
  title: string;
  information: string;
  link: string;
};

const Card = ({ title, information, link }: CardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{information}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
        data-link-title={title}
      >
        Learn More
      </a>
    </div>
  );
};

export default Card;
