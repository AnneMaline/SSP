import { promises as fs } from "fs";
import path from "path";
import {
  ContentType,
  SubchapterType,
  ImageType,
  VideoType,
  ListType,
  ParagraphType,
} from "./interfaces";

async function getContent(fileName: string): Promise<ContentType> {
  const filePath = path.join(process.cwd(), "src/assets/content", fileName);

  const fileContent = await fs.readFile(filePath, "utf-8");

  const lines = fileContent.split("\n");
  const content: ContentType = { name: "", chapterNumber: 0, subchapters: [] };
  let currentSubchapter: SubchapterType | null = null;
  let currentList: ListType | null = null;

  for (const line of lines) {
    if (line.startsWith("Chapter")) {
      content.name = line.split(":")[1].trim();
      content.chapterNumber = parseInt(line.split(":")[0].split(" ")[1]);
    } else if (line.startsWith("##")) {
      if (currentSubchapter) {
        // push the current list if it exists
        if (currentList) {
          currentSubchapter.content.push(currentList);
          currentList = null;
        }

        // push the current subchapter
        content.subchapters.push(currentSubchapter);
      }
      currentSubchapter = { title: line.replace("##", "").trim(), content: [] };
    } else if (line.startsWith("#img:")) {
      // make a default subchapter for content
      if (!currentSubchapter) {
        currentSubchapter = { title: "Default", content: [] };
      }

      // push the current list if it exists
      if (currentList) {
        currentSubchapter?.content.push(currentList);
        currentList = null;
      }

      // push image to current subchapter
      const image: ImageType = {
        type: "image",
        path: "/images/" + line.replace("#img:", "").split(";")[0].trim(),
        altText: line.replace("#img:", "").trim().split(".")[0],
      };
      console.log(image.path);
      currentSubchapter?.content.push(image);
    } else if (line.startsWith("#video:")) {
      // make a default subchapter for content
      if (!currentSubchapter) {
        currentSubchapter = { title: "Default", content: [] };
      }

      // push the current list if it exists
      if (currentList) {
        currentSubchapter?.content.push(currentList);
        currentList = null;
      }

      // push video to current subchapter
      const video: VideoType = {
        type: "video",
        path: "/videos/" + line.replace("#video:", "").split(";")[0].trim(),
        altText: line.replace("#video:", "").trim().split(".")[0],
      };
      currentSubchapter?.content.push(video);
    } else if (line.startsWith("-") || line.startsWith("*")) {
      // make a default subchapter for content
      if (!currentSubchapter) {
        currentSubchapter = { title: "Default", content: [] };
      }

      // push the current list if it exists
      if (!currentList) {
        currentList = { type: "list", items: [] };
      }

      // push the list item to the current list
      currentList.items.push(line.replace(/^[-*]\s*/, "").trim());
    } else if (line.trim()) {
      // make a default subchapter for content
      if (!currentSubchapter) {
        currentSubchapter = { title: "Default", content: [] };
      }

      // push the current list if it exists
      if (currentList) {
        currentSubchapter?.content.push(currentList);
        currentList = null;
      }

      // push paragraph to the current subchapter
      const paragraph: ParagraphType = {
        type: "paragraph",
        content: line.trim(),
      };
      currentSubchapter?.content.push(paragraph);
    }
  }

  if (currentSubchapter) {
    // push the current list if it exists
    if (currentList) {
      currentSubchapter.content.push(currentList);
    }
    content.subchapters.push(currentSubchapter);
  }

  console.log(content);
  return content;
}

export { getContent };
