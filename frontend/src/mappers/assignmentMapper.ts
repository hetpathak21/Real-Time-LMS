import { IAssignment } from "../types/assignmentTypes";

export interface AssignmentUI {
  _id: string;
  title: string;
  courseName: string;
  dueDate: string;
  status: "Published" | "Draft";
}

export const mapAssignmentToUI = (a: IAssignment): AssignmentUI => {
  return {
    _id: a._id,
    title: a.title,
    courseName:
      typeof a.courseId === "object"
        ? a.courseId.title
        : "Unknown Course",

    dueDate: new Date(a.dueDate).toLocaleDateString(),

    status: a.isPublished ? "Published" : "Draft",
  };
};