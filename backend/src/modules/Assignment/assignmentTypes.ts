export interface CreateAssignmentPayload {
  title: string;
  description: string;
  dueDate: Date | string;
  totalMarks: number;
  attachmentUrl?: string;
  isPublished?: boolean;
}

export interface UpdateAssignmentPayload {
  title?: string;
  description?: string;
  dueDate?: Date | string;
  totalMarks?: number;
  attachmentUrl?: string;
  isPublished?: boolean;
}

export interface AssignmentViewer {
  userId: string;
  role: "student" | "teacher" | "admin";
}

export interface CreateSubmissionPayload {
  textAnswer?: string;
  fileUrl?: string;
}

export interface GradeSubmissionPayload {
  grade: number;
  feedback?: string;
}
