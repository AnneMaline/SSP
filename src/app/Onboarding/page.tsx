"use client";
import Card from "@/components/InfoCard/Card";
import ContentRenderer from "@/components/InfoCard/Content/ContentRenderer";
import SideBar from "@/components/SideBar";
import "./Onboarding.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Chapter, ContentType } from "@/utils/interfaces";

export default function OnboardingPage() {
  const searchParams = useSearchParams();
  const chapter = searchParams ? searchParams.get("chapter") : null;
  const [content, setContent] = useState<ContentType>();
  const [chapters, setChapters] = useState<Chapter[]>([]);

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

  if (!chapter) {
    return (
      <div className="container">
        <SideBar chapters={chapters} />
        <h1>Select a chapter to view content</h1>
      </div>
    );
  }

  if (!content) {
    return <div>Loading content for chapter {chapter}...</div>;
  }

  return (
    <div className="container">
      <SideBar chapters={chapters} />
      <div className="content">
        <div className="info-cards">
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
