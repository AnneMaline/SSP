import List from "../Content/List";
import Image from "next/image";
import { SubchapterType } from "@/utils/interfaces";
import "./Styles.css";

interface ContentRenderProps {
  subChapter: SubchapterType;
}

const ContentRenderer = async ({ subChapter }: ContentRenderProps) => {
  return (
    <div>
      {/* ------------Title of the Info Card------------ */}
      {subChapter.title !== "Default" && (
        <h1 className="title">{subChapter.title}</h1>
      )}
      {/* ------------Content of the Info Card------------ */}
      {subChapter.content.map((content, index) => (
        <div key={index}>
          {/* ------------Content is Paragraph------------ */}
          {content.type === "paragraph" && (
            <p className="paragraph">{content.content}</p>
          )}
          {/* ------------Content is List------------ */}
          {content.type === "list" && <List items={content.items} />}
          {/* ------------Content is Image------------ */}
          {content.type === "image" && (
            <Image
              src={content.path}
              alt={content.altText}
              width={500}
              height={500}
              className="image"
            />
          )}
          {/* ------------Content is Video------------ */}
          {content.type === "video" && (
            <video controls className="video">
              <source src={content.path} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      ))}
    </div>
  );
};

export default ContentRenderer;
