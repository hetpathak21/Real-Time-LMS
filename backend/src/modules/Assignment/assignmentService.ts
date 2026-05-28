import Assignment from "../../models/AssignmentModel";
import Course from "../../models/CourseModel";
import Enrollment from "../../models/EnrollmentModel";
import Submission from "../../models/SubmissionModel";
import { AppError } from "../../utils/appError";
import { dbCall } from "../../utils/dbCall";
import { STATUS_CODES } from "../../constants/StatusCodes";
import {
  AssignmentViewer,
  CreateAssignmentPayload,
  CreateSubmissionPayload,
  GradeSubmissionPayload,
  UpdateAssignmentPayload,
} from "./assignmentTypes";

const checkTeacherCourseAccess = async (
  courseId: string,
  teacherId: string
) => {
  const course = await Course.findOne({
    _id: courseId,
    teacherId,
  });

  if (!course) {
    throw new AppError(
      "Course not found or access denied",
      STATUS_CODES.NOT_FOUND
    );
  }

  return course;
};

const checkStudentEnrollment = async (
  courseId: string,
  studentId: string
) => {
  const enrollment = await Enrollment.findOne({
    courseId,
    studentId,
  });

  if (!enrollment) {
    throw new AppError(
      "Enrollment required to access this assignment",
      STATUS_CODES.FORBIDDEN
    );
  }

  return enrollment;
};

export const createAssignmentService = async (
  courseId: string,
  teacherId: string,
  payload: CreateAssignmentPayload
) => {
  if (!teacherId) {
    throw new AppError("Teacher ID is required", STATUS_CODES.BAD_REQUEST);
  }

  return dbCall(async () => {
    await checkTeacherCourseAccess(courseId, teacherId);

    const assignment = await Assignment.create({
      ...payload,
      courseId,
      teacherId,
      isPublished: payload.isPublished ?? false,
    });

    return assignment;
  });
};

export const getCourseAssignmentsService = async (
  courseId: string,
  viewer: AssignmentViewer
) => {
  return dbCall(async () => {
    const course = await Course.findById(courseId);

    if (!course) {
      throw new AppError("Course not found", STATUS_CODES.NOT_FOUND);
    }

    const filter: Record<string, unknown> = { courseId };

    if (viewer.role === "teacher") {
      await checkTeacherCourseAccess(courseId, viewer.userId);
    }

    if (viewer.role === "student") {
      await checkStudentEnrollment(courseId, viewer.userId);
      filter.isPublished = true;
    }

    const assignments = await Assignment.find(filter)
      .populate("teacherId", "name email avatar")
      .sort({ dueDate: 1, createdAt: -1 });

    return assignments;
  });
};

export const getAssignmentByIdService = async (
  assignmentId: string,
  viewer: AssignmentViewer
) => {
  return dbCall(async () => {
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      throw new AppError("Assignment not found", STATUS_CODES.NOT_FOUND);
    }

    if (viewer.role === "teacher") {
      await checkTeacherCourseAccess(
        assignment.courseId.toString(),
        viewer.userId
      );
    }

    if (viewer.role === "student") {
      if (!assignment.isPublished) {
        throw new AppError("Assignment not found", STATUS_CODES.NOT_FOUND);
      }

      await checkStudentEnrollment(
        assignment.courseId.toString(),
        viewer.userId
      );
    }

    await assignment.populate("courseId", "title teacherId isPublished");
    await assignment.populate("teacherId", "name email avatar");

    return assignment;
  });
};

export const updateAssignmentService = async (
  assignmentId: string,
  teacherId: string,
  payload: UpdateAssignmentPayload
) => {
  if (!teacherId) {
    throw new AppError("Teacher ID is required", STATUS_CODES.BAD_REQUEST);
  }

  return dbCall(async () => {
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      throw new AppError("Assignment not found", STATUS_CODES.NOT_FOUND);
    }

    await checkTeacherCourseAccess(
      assignment.courseId.toString(),
      teacherId
    );

    Object.assign(assignment, payload);

    await assignment.save();

    return assignment;
  });
};

export const deleteAssignmentService = async (
  assignmentId: string,
  teacherId: string
) => {
  if (!teacherId) {
    throw new AppError("Teacher ID is required", STATUS_CODES.BAD_REQUEST);
  }

  return dbCall(async () => {
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      throw new AppError("Assignment not found", STATUS_CODES.NOT_FOUND);
    }

    await checkTeacherCourseAccess(
      assignment.courseId.toString(),
      teacherId
    );

    await assignment.deleteOne();

    return assignment;
  });
};

export const setAssignmentPublishStatusService = async (
  assignmentId: string,
  teacherId: string,
  isPublished: boolean
) => {
  if (!teacherId) {
    throw new AppError("Teacher ID is required", STATUS_CODES.BAD_REQUEST);
  }

  return dbCall(async () => {
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      throw new AppError("Assignment not found", STATUS_CODES.NOT_FOUND);
    }

    await checkTeacherCourseAccess(
      assignment.courseId.toString(),
      teacherId
    );

    assignment.isPublished = isPublished;

    await assignment.save();

    return assignment;
  });
};

export const submitAssignmentService = async (
  assignmentId: string,
  studentId: string,
  payload: CreateSubmissionPayload
) => {
  if (!studentId) {
    throw new AppError("Student ID is required", STATUS_CODES.BAD_REQUEST);
  }

  return dbCall(async () => {
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment || !assignment.isPublished) {
      throw new AppError("Assignment not found", STATUS_CODES.NOT_FOUND);
    }

    await checkStudentEnrollment(
      assignment.courseId.toString(),
      studentId
    );

    const existingSubmission = await Submission.findOne({
      assignmentId,
      studentId,
    });

    if (existingSubmission) {
      throw new AppError(
        "Assignment already submitted",
        STATUS_CODES.CONFLICT
      );
    }

    const submission = await Submission.create({
      assignmentId,
      studentId,
      textAnswer: payload.textAnswer,
      fileUrl: payload.fileUrl,
      status: "submitted",
      submittedAt: new Date(),
    });

    return submission;
  });
};

export const getAssignmentSubmissionsService = async (
  assignmentId: string,
  teacherId: string
) => {
  if (!teacherId) {
    throw new AppError("Teacher ID is required", STATUS_CODES.BAD_REQUEST);
  }

  return dbCall(async () => {
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      throw new AppError("Assignment not found", STATUS_CODES.NOT_FOUND);
    }

    await checkTeacherCourseAccess(
      assignment.courseId.toString(),
      teacherId
    );

    const submissions = await Submission.find({ assignmentId })
      .populate("studentId", "name email avatar")
      .sort({ submittedAt: -1 });

    return submissions;
  });
};

export const gradeSubmissionService = async (
  submissionId: string,
  teacherId: string,
  payload: GradeSubmissionPayload
) => {
  if (!teacherId) {
    throw new AppError("Teacher ID is required", STATUS_CODES.BAD_REQUEST);
  }

  return dbCall(async () => {
    const submission = await Submission.findById(submissionId);

    if (!submission) {
      throw new AppError("Submission not found", STATUS_CODES.NOT_FOUND);
    }

    const assignment = await Assignment.findById(submission.assignmentId);

    if (!assignment) {
      throw new AppError("Assignment not found", STATUS_CODES.NOT_FOUND);
    }

    await checkTeacherCourseAccess(
      assignment.courseId.toString(),
      teacherId
    );

    if (payload.grade > assignment.totalMarks) {
      throw new AppError(
        "Grade cannot exceed assignment total marks",
        STATUS_CODES.BAD_REQUEST
      );
    }

    submission.grade = payload.grade;
    submission.feedback = payload.feedback;
    submission.status = "graded";

    await submission.save();

    return submission;
  });
};
