import Course from "../../models/CourseModel";
import Enrollment from "../../models/EnrollmentModel";
import { AppError } from "../../utils/appError";
import { dbCall } from "../../utils/dbCall";
import { STATUS_CODES } from "../../constants/StatusCodes";
import { EnrollmentQuery } from "./enrollmentTypes";

export const enrollCourseService = async (
  courseId: string,
  studentId: string
) => {
  if (!studentId) {
    throw new AppError(
      "Student ID is required",
      STATUS_CODES.BAD_REQUEST
    );
  }

  return dbCall(async () => {
    const course = await Course.findById(courseId);

    if (!course) {
      throw new AppError(
        "Course not found",
        STATUS_CODES.NOT_FOUND
      );
    }

    if (!course.isPublished) {
      throw new AppError(
        "You can only enroll in published courses",
        STATUS_CODES.BAD_REQUEST
      );
    }

    const existingEnrollment = await Enrollment.findOne({
      courseId,
      studentId,
    });

    if (existingEnrollment) {
      throw new AppError(
        "You are already enrolled in this course",
        STATUS_CODES.BAD_REQUEST
      );
    }

    const enrollment = await Enrollment.create({
      courseId,
      studentId,
      progress: 0,
      completed: false,
      lastAccessedAt: new Date(),
    });

    await Course.findByIdAndUpdate(courseId, {
      $inc: { enrollmentCount: 1 },
    });

    return enrollment;
  });
};

export const getMyEnrolledCoursesService = async (
  studentId: string,
  query: EnrollmentQuery
) => {
  if (!studentId) {
    throw new AppError(
      "Student ID is required",
      STATUS_CODES.BAD_REQUEST
    );
  }

  return dbCall(async () => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { studentId };

    const [enrollments, total] = await Promise.all([
      Enrollment.find(filter)
        .populate("courseId", "title description thumbnail category tags teacherId enrollmentCount")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Enrollment.countDocuments(filter),
    ]);

    return {
      enrollments,
      meta: {
        page,
        limit,
        total,
      },
    };
  });
};

export const getEnrollmentProgressService = async (
  courseId: string,
  studentId: string
) => {
  if (!studentId) {
    throw new AppError(
      "Student ID is required",
      STATUS_CODES.BAD_REQUEST
    );
  }

  return dbCall(async () => {
    const enrollment = await Enrollment.findOne({
      courseId,
      studentId,
    }).populate("courseId", "title thumbnail");

    if (!enrollment) {
      throw new AppError(
        "Enrollment not found",
        STATUS_CODES.NOT_FOUND
      );
    }

    return enrollment;
  });
};

export const updateLastAccessedService = async (
  courseId: string,
  studentId: string
) => {
  if (!studentId) {
    throw new AppError(
      "Student ID is required",
      STATUS_CODES.BAD_REQUEST
    );
  }

  return dbCall(async () => {
    const enrollment = await Enrollment.findOneAndUpdate(
      {
        courseId,
        studentId,
      },
      {
        lastAccessedAt: new Date(),
      },
      {
        new: true,
      }
    );

    if (!enrollment) {
      throw new AppError(
        "Enrollment not found",
        STATUS_CODES.NOT_FOUND
      );
    }

    return enrollment;
  });
};

export const getCourseStudentsService = async (
  courseId: string,
  teacherId: string,
  query: EnrollmentQuery
) => {
  if (!teacherId) {
    throw new AppError(
      "Teacher ID is required",
      STATUS_CODES.BAD_REQUEST
    );
  }

  return dbCall(async () => {
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

    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { courseId };

    const [students, total] = await Promise.all([
      Enrollment.find(filter)
        .populate("studentId", "name email avatar")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Enrollment.countDocuments(filter),
    ]);

    return {
      students,
      meta: {
        page,
        limit,
        total,
      },
    };
  });
};