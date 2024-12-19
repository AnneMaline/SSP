"use client";
import Card from "@/components/InfoCard/Card";
import ContentRenderer from "@/components/InfoCard/Content/ContentRenderer";
import SideBar from "@/components/SideBar";
import styles from "./onboarding.module.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Chapter, ContentType } from "@/utils/interfaces";
import TitleBanner from "@/components/TitleBanner";

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const chapter = searchParams ? searchParams.get("chapter") : null;
  const [content, setContent] = useState<ContentType>();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const descriptionOnboarding =
    "How to get started; Getting started with OSDU can be complicated. This will help you getting the right start on your wonderful journey";

  // ---------------FETCH CHAPTERS----------------
  useEffect(() => {
    async function fetchChapters() {
      try {
        const response = await fetch("/api/content");
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setChapters(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchChapters();
  }, []);

  // ---------------FETCH CONTENT----------------
  useEffect(() => {
    if (!chapter) return;

    async function fetchContent() {
      try {
        const response = await fetch(`/api/content/${chapter}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const { data } = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Error fetching content:", error);
        setContent(undefined);
      }
    }

    fetchContent();
  }, [chapter]);

  // ---------------Select chapter----------------
  if (!chapter) {
    return (
      <div className={styles.container}>
        <SideBar chapters={chapters} />
        <div className={styles.content}>
          {/* Title */}
          <TitleBanner
            title="Onboarding"
            description={descriptionOnboarding}
            back={true}
          />
          <h1 className={styles.temp_text}>Select a chapter to view content</h1>
        </div>
      </div>
    );
  }

  // ---------------Loading content----------------
  if (!content) {
    return (
      <div className={styles.temp_text}>
        Loading content for chapter {chapter}...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <SideBar chapters={chapters} />
      {/* Content */}
      <div className={styles.content}>
        {/* Title */}
        <TitleBanner
          title={chapter + ". " + content.name}
          description={""}
          back={true}
        />
        <div className={styles.info_cards}>
          {content.subchapters.map((subchapter, index) => (
            <Card key={index}>
              <ContentRenderer subChapter={subchapter} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
