import Card from "../../components/InfoCard/Card";
import ContentRenderer from "@/components/InfoCard/Content/ContentRenderer";
import { getContent } from "@/utils/getContent";

export default async function OnboardingPage() {
  const data = await getContent("chapter1-1.txt");
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
