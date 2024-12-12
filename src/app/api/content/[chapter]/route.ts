import { NextRequest, NextResponse } from "next/server";
import { getContent } from "@/utils/getContent";

export async function GET(request: NextRequest) {
  const { pathname } = new URL(request.url);
  const chapter = pathname.split("/").pop();
  const fileName = `chapter${chapter}.txt`;

  if (!fileName) {
    return NextResponse.json(
      { error: "Chapter not specified" },
      { status: 400 }
    );
  }

  try {
    const data = await getContent(fileName);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
