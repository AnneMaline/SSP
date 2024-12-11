// ----------------Content Structure Interfaces----------------
export interface ContentType {
  name: string;
  chapterNumber: number;
  subchapters: SubchapterType[];
}

export interface SubchapterType {
  title: string;
  content: (ImageType | VideoType | ListType | ParagraphType)[];
}

export interface ImageType {
  type: "image";
  path: string;
  altText: string;
}

export interface VideoType {
  type: "video";
  path: string;
  altText: string;
}

export interface ListType {
  type: "list";
  items: string[];
}

export interface ParagraphType {
  type: "paragraph";
  content: string;
}

// ----------------Chapter Structure Interfaces----------------
export interface Chapter {
  name: string;
  chapterNumber: number;
  subchapters: SubChapter[];
}

export interface SubChapter {
  name: string;
  subchapterNumber: number;
  fileName: string;
}
