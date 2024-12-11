import Card from "../../components/InfoCard/Card";
import ContentRenderer from "@/components/InfoCard/Content/ContentRenderer";
import { getChapterStructure } from "@/utils/getChapterStructure";
import { getContent } from "@/utils/getContent";

export default async function OnboardingPage() {
  const chapters = await getChapterStructure();
  const data = await getContent(chapters[0].subchapters[0].fileName);
  return (
    <div>
      {/* <SideBar /> */}
      <div>
        {data.subchapters.map((subchapter, index) => (
          <Card key={index}>
            <ContentRenderer subChapter={subchapter} />
          </Card>
        ))}
      </div>
    </div>
  );
}
