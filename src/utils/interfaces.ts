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
