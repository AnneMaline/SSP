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

// ----------------Request Structure Interfaces----------------
export type RequestDropDownType = {
  requestID: string;
  name: string;
  description: string;
  applicant: string;
  reason: string;
  data_partition_id: string;
  type: CreateGroupRequest | AddMemberRequest;
};

export type CreateGroupRequest = {
  type: "CREATE_GROUP";
  group_type: string;
  access_type: string;
};

export type AddMemberRequest = {
  type: "ADD_MEMBER";
  entraID: string;
  role: "OWNER" | "MEMBER";
  group_email: string;
};
