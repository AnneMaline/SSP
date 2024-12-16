import * as fs from "fs";
import * as path from "path";
import { Chapter } from "./interfaces";

// get chapter strucutre from chapter-structure.txt
async function getChapterStructure(): Promise<Chapter[]> {
  const filePath = path.join(
    process.cwd(),
    "src/assets/content",
    "/chapter-structure.txt"
  );

  try {
    // read file
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const lines = fileContent.split("\n");
    const chapters: Chapter[] = [];

    let currentChapter: Chapter | null = null;

    // structure text files into Chapter and Subchapter objects
    lines.forEach((line) => {
      const trimmedLine = line.trim();
      if (!trimmedLine.startsWith("#")) {
        if (currentChapter) {
          chapters.push(currentChapter);
          currentChapter = null;
        }
        const chapterName = trimmedLine.split(":")[1];
        const chapterNumber = parseInt(trimmedLine.split(":")[0].split(" ")[1]);
        currentChapter = {
          name: chapterName,
          chapterNumber: chapterNumber,
          subchapters: [],
        };
      } else if (currentChapter) {
        const subchapterParts = trimmedLine.replace("#", "").trim().split(":");
        const subchapterNumber = parseInt(
          subchapterParts[0].split("-")[1].replace(".txt", "")
        );
        const subchapterName = subchapterParts[1].trim();
        const fileName = subchapterParts[0].trim();
        currentChapter.subchapters.push({
          name: subchapterName,
          subchapterNumber,
          fileName,
        });
      }
    });

    if (currentChapter) {
      chapters.push(currentChapter);
    }

    return chapters;
  } catch (error) {
    console.error("Error reading file:", error);
    return [];
  }
}

export { getChapterStructure };
