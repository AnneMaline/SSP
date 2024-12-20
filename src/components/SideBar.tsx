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
  const [open, setOpen] = useState(true);

  // ---------------Toggle chapter dropdown----------------
  const toggleChapter = (title: string) => {
    setOpenChapters((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  if (!open) {
    return (
      <div className={styles.sidebar} style={{ width: "fit-content" }}>
        {/* Open sidebar */}
        <button onClick={() => setOpen(true)} className={styles.close_button}>
          <img src="/icons/open.svg" alt="close" />
        </button>
      </div>
    );
  }

  return (
    <div className={styles.sidebar}>
      {/* Close sidebar */}
      <button onClick={() => setOpen(false)} className={styles.close_button}>
        <img src="/icons/close1.svg" alt="close" />
      </button>

      {/* Chapter titles with "button" to open subchapters */}
      {chapters.map((chapter) => (
        <div key={chapter.name}>
          <div
            onClick={() => toggleChapter(chapter.name)}
            className={styles.chapter_title}
          >
            <p className="text-white text-small">
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
                  className="text-white text-small"
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
