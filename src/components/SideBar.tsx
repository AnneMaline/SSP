"use client";
import { Chapter } from "@/utils/interfaces";
import { useState } from "react";
import "./SideBar.css";

interface SideBarProps {
  chapters: Chapter[];
}

const SideBar = ({ chapters }: SideBarProps) => {
  const [openChapters, setOpenChapters] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleChapter = (title: string) => {
    setOpenChapters((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="sidebar">
      {chapters.map((chapter) => (
        <div key={chapter.name}>
          <div
            onClick={() => toggleChapter(chapter.name)}
            className="chapter-title"
          >
            {chapter.name}
          </div>
          {openChapters[chapter.name] && (
            <div className="subchapters">
              {chapter.subchapters.map((subchapter) => (
                <a
                  key={subchapter.name}
                  href={
                    "onboarding?chapter=" +
                    chapter.chapterNumber.toString() +
                    "-" +
                    subchapter.subchapterNumber.toString()
                  }
                  className="subchapter-link"
                >
                  {subchapter.name}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
