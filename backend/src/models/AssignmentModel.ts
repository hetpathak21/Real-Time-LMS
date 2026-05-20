import mongoose, { Document, Schema } from "mongoose";

export interface IAssignment extends Document {
  courseId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  attachments?: string[];
  deadline: Date;
  totalMarks: number;
  createdBy: mongoose.Types.ObjectId;
}

const assignmentSchema = new Schema<IAssignment>(
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

    description: {
      type: String,
    },

    attachments: [
      {
        type: String,
      },
    ],

    deadline: {
      type: Date,
      required: true,
    },

    totalMarks: {
      type: Number,
      default: 100,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IAssignment>(
  "Assignment",
  assignmentSchema
);