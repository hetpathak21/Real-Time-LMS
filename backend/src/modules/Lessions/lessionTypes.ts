export interface CreateLessonPayload {
  title: string;
  type: "video" | "pdf" | "text" | "link";
  contentUrl?: string;
  order?: number;
  duration?: number;
  isPreview?: boolean;
}

export interface UpdateLessonPayload {
  title?: string;
  type?: "video" | "pdf" | "text" | "link";
  contentUrl?: string;
  order?: number;
  duration?: number;
  isPreview?: boolean;
}
