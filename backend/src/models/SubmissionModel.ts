import mongoose, { Document, Schema } from "mongoose";

export interface ISubmission extends Document {
  assignmentId: mongoose.Types.ObjectId;
  studentId: mongoose.Types.ObjectId;
  fileUrl?: string;
  textAnswer?: string;
  status: "submitted" | "reviewed" | "graded";
  grade?: number;
  feedback?: string;
  submittedAt: Date;
}

const submissionSchema = new Schema<ISubmission>(
  {
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },

    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileUrl: {
      type: String,
    },

    textAnswer: {
      type: String,
    },

    status: {
      type: String,
      enum: ["submitted", "reviewed", "graded"],
      default: "submitted",
    },

    grade: {
      type: Number,
    },

    feedback: {
      type: String,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

submissionSchema.index(
  { assignmentId: 1, studentId: 1 },
  { unique: true }
);

export default mongoose.model<ISubmission>(
  "Submission",
  submissionSchema
);