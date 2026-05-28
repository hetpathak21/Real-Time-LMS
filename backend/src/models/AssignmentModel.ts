import mongoose, { Document, Schema } from "mongoose";

export interface IAssignment extends Document {
  courseId: mongoose.Types.ObjectId;
  teacherId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  dueDate: Date;
  totalMarks: number;
  attachmentUrl?: string;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const assignmentSchema = new Schema<IAssignment>(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    dueDate: {
      type: Date,
      required: true,
    },

    totalMarks: {
      type: Number,
      default: 100,
      min: 1,
    },

    attachmentUrl: {
      type: String,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

assignmentSchema.index({ courseId: 1, createdAt: -1 });
assignmentSchema.index({ courseId: 1, isPublished: 1 });

export default mongoose.model<IAssignment>(
  "Assignment",
  assignmentSchema
);
