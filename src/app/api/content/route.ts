import { getChapterStructure } from "@/utils/getChapterStructure";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const chapterStructure = await getChapterStructure();
    return NextResponse.json(chapterStructure);
  } catch (error) {
    console.error("Error fetching chapter structure:", error);
    return NextResponse.json(
      { error: "Failed to load chapter structure" },
      { status: 500 }
    );
  }
}
