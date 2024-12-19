"use client";
import { Chapter } from "@/utils/interfaces";
import { useState } from "react";
import styles from "./SideBar.module.css";

interface SideBarProps {
  chapters: Chapter[];
}

const SideBar = ({ chapters }: SideBarProps) => {
  const [openChapters, setOpenChapters] = useState<{ [key: string]: boolean }>(
    {}
  );

  // ---------------Toggle chapter dropdown----------------
  const toggleChapter = (title: string) => {
    setOpenChapters((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className={styles.sidebar}>
      {/* Chapter titles with "button" to open subchapters */}
      {chapters.map((chapter) => (
        <div key={chapter.name}>
          <div
            onClick={() => toggleChapter(chapter.name)}
            className={styles.chapter_title}
          >
            <p className="text-sidebar">
              {"Chapter " + chapter.chapterNumber + ": " + chapter.name}
            </p>
          </div>

          {/* Subchapters name and links to pages */}
          {openChapters[chapter.name] && (
            <div className={styles.subchapters}>
              {chapter.subchapters.map((subchapter) => (
                <a
                  key={subchapter.name}
                  href={
                    "onboarding?chapter=" +
                    chapter.chapterNumber.toString() +
                    "." +
                    subchapter.subchapterNumber.toString()
                  }
                  className="text-sidebar"
                >
                  {chapter.chapterNumber.toString() +
                    "." +
                    subchapter.subchapterNumber.toString() +
                    " " +
                    subchapter.name}
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
