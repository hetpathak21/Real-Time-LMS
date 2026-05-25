export interface CreateAssignmentPayload {
  title: string;
  description?: string;
  attachments?: string[];
  deadline: Date;
  totalMarks?: number;
}

export interface UpdateAssignmentPayload {
  title?: string;
  description?: string;
  attachments?: string[];
  deadline?: Date;
  totalMarks?: number;
}