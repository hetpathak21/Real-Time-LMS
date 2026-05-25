import Assignment from "../../models/AssignmentModel";
import Course from "../../models/CourseModel";
import { AppError } from "../../utils/appError";
import { dbCall } from "../../utils/dbCall";
import { STATUS_CODES } from "../../constants/StatusCodes";
import {
  CreateAssignmentPayload,
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
      createdBy: teacherId,
    });

    return assignment;
  });
};

export const getCourseAssignmentsService = async (courseId: string) => {
  return dbCall(async () => {
    const course = await Course.findById(courseId);

    if (!course) {
      throw new AppError("Course not found", STATUS_CODES.NOT_FOUND);
    }

    const assignments = await Assignment.find({ courseId })
      .populate("createdBy", "name email avatar")
      .sort({ deadline: 1, createdAt: -1 });

    return assignments;
  });
};

export const getAssignmentByIdService = async (assignmentId: string) => {
  return dbCall(async () => {
    const assignment = await Assignment.findById(assignmentId)
      .populate("courseId", "title teacherId isPublished")
      .populate("createdBy", "name email avatar");

    if (!assignment) {
      throw new AppError("Assignment not found", STATUS_CODES.NOT_FOUND);
    }

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