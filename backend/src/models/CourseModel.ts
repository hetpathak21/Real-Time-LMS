import mongoose, { Document, Schema } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  thumbnail?: string;
  teacherId: mongoose.Types.ObjectId;
  category?: string;
  tags?: string[];
  isPublished: boolean;
  enrollmentCount: number;
}

const courseSchema = new Schema<ICourse>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    thumbnail: {
      type: String,
    },

    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
    },

    tags: [
      {
        type: String,
      },
    ],

    isPublished: {
      type: Boolean,
      default: false,
    },

    enrollmentCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICourse>("Course", courseSchema);