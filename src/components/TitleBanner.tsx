import React from "react";
import styles from "./TitleBanner.module.css"; // Make sure to create a corresponding CSS file for styling

interface TitleBannerProps {
  title: string;
  description: string;
  back: boolean;
}

const TitleBanner = ({ title, description, back }: TitleBannerProps) => {
  return (
    <div className={styles.title_banner}>
      {/* Back button if back is true */}
      {back ? (
        <div className={styles.back_arrow}>
          <button onClick={() => window.history.back()}>&larr; Back</button>
        </div>
      ) : (
        <div className={styles.no_back_arrow}></div>
      )}

      {/* Title */}
      <div className={styles.content_title}>
        <p className="text-small text-[#3d3d3d]">Welcome to</p>
        <h1 className="text-title">{title}</h1>
      </div>

      {/* Seperator */}
      <hr className={styles.separator} />

      {/* Description */}
      <div className={styles.description}>
        <p className="text-normal">{description}</p>
      </div>
    </div>
  );
};

export default TitleBanner;
