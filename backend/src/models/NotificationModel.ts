import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  title?: string;
  message: string;
  type: "assignment" | "grade" | "system" | "enrollment";
  isRead: boolean;
}

const notificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["assignment", "grade", "system", "enrollment"],
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<INotification>(
  "Notification",
  notificationSchema
);