import Link from "next/link";
import styles from "./TopTask.module.css";

interface TopTaskProps {
  title: string; // Title on the top task
  pageTitle: string; // The page title
  description: string; // Description of what the page does
  targetUrl: string; // Target URL for navigation
  icon: string; // File to icon for the top task
}

const TopTask = ({
  title,
  pageTitle,
  description,
  targetUrl,
  icon,
}: TopTaskProps) => {
  return (
    <Link href={targetUrl} className={styles.container}>
      <h1
        style={{ fontSize: "24px", marginBottom: "10px" }}
        className="text-title"
      >
        {title}
      </h1>
      <hr className={styles.separator} />
      <div className={styles.content}>
        <div className={styles.icon_circle}>
          <img src={icon} alt="icon" width={20} />
        </div>
        <div className={styles.content_text}>
          <p className="text-bold">{pageTitle}</p>
          <p className="text-small">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default TopTask;
