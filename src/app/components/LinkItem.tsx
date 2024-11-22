import React from "react";

type LinkItemProps = {
  title: string;
  information: string;
  tags: string[];
  link: string;
};

const LinkItem = ({ title, information, tags, link }: LinkItemProps) => {
  return (
    <div className="py-4 border-b border-gray-200">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-gray-700 my-2">{information}</p>
      <div className="mb-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Learn More
      </a>
    </div>
  );
};

export default LinkItem;
