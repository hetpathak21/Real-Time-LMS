export interface CreateLessonPayload {
  title: string;
  type: "video" | "pdf" | "text" | "document" | "link";
  contentUrl?: string;
  textContent?: string;
  fileName?: string;
  mimeType?: string;
  order?: number;
  duration?: number;
  isPreview?: boolean;
}

export interface UpdateLessonPayload {
  title?: string;
  type?: "video" | "pdf" | "text" | "document" | "link";
  contentUrl?: string;
  textContent?: string;
  fileName?: string;
  mimeType?: string;
  order?: number;
  duration?: number;
  isPreview?: boolean;
}
