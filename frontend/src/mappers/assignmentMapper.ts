import { IAssignment } from "../types/assignmentTypes";

export interface AssignmentUI {
  _id: string;
  title: string;
  courseName: string;
  dueDate: string;
  status: "Pending" | "Submitted" | "Reviewed";
}

export const mapAssignmentToUI = (a: IAssignment): AssignmentUI => {
  return {
    _id: a._id,
    title: a.title,
    courseName:
      typeof a.course === "object"
        ? a.course.title
        : "Unknown Course",

    dueDate: new Date(a.dueDate).toLocaleDateString(),

    status:
      a.status === "published"
        ? "Pending"
        : a.status === "closed"
        ? "Reviewed"
        : "Pending",
  };
};