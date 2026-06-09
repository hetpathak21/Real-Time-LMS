import mongoose, { Document, Schema } from "mongoose";

export interface ILesson extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  type: "video" | "pdf" | "text" | "document" | "link";
  contentUrl?: string;
  textContent?: string;
  fileName?: string;
  mimeType?: string;
  order: number;
  duration?: number;
  isPreview: boolean;
}

const lessonSchema = new Schema<ILesson>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["video", "pdf", "text", "document", "link"],
      required: true,
    },

    contentUrl: {
      type: String,
    },

    textContent: {
      type: String,
    },

    fileName: {
      type: String,
    },

    mimeType: {
      type: String,
    },

    order: {
      type: Number,
      default: 0,
    },

    duration: {
      type: Number,
    },

    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILesson>(
  "Lesson",
  lessonSchema
);
