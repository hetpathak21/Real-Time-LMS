import mongoose, { Document, Schema } from "mongoose";

export interface IEnrollment extends Document {
  studentId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  progress: number;
  completed: boolean;
  lastAccessedAt?: Date;
}

const enrollmentSchema = new Schema<IEnrollment>(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    progress: {
      type: Number,
      default: 0,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    lastAccessedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

enrollmentSchema.index(
  { studentId: 1, courseId: 1 },
  { unique: true }
);

export default mongoose.model<IEnrollment>(
  "Enrollment",
  enrollmentSchema
);