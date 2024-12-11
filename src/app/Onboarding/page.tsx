import Card from "../../components/InfoCard/Card";
import ContentRenderer from "@/components/InfoCard/Content/ContentRenderer";
import SideBar from "@/components/SideBar";
import { getChapterStructure } from "@/utils/getChapterStructure";
import { getContent } from "@/utils/getContent";
import "./Onboarding.css";

export default async function OnboardingPage() {
  const chapters = await getChapterStructure();
  const data = await getContent(chapters[0].subchapters[0].fileName);
  return (
    <div className="container">
      <SideBar chapters={chapters} />
      <div className="content">
        <div className="info-cards">
          {data.subchapters.map((subchapter, index) => (
            <Card key={index}>
              <ContentRenderer subChapter={subchapter} />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
