import Course from "../../models/CourseModel";
import { AppError } from "../../utils/appError";
import { dbCall } from "../../utils/dbCall";
import {
  CourseQuery,
  CreateCoursePayload,
  UpdateCoursePayload,
} from "./courseTypes";

export const createCourseService = async (
  payload: CreateCoursePayload,
  teacherId: string
) => {
  return dbCall(async () => {
    const course = await Course.create({
      ...payload,
      teacherId,
      isPublished: false,
    });

    return course;
  });
};

export const getMyCoursesService = async (
  teacherId: string,
  query: CourseQuery
) => {
  return dbCall(async () => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {
      teacherId,
    };

    if (query.search) {
      filter.title = { $regex: query.search, $options: "i" };
    }

    if (query.category) {
      filter.category = query.category;
    }

    if (query.level) {
      filter.level = query.level;
    }

    const [courses, total] = await Promise.all([
      Course.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),

      Course.countDocuments(filter),
    ]);

    return {
      courses,
      meta: {
        page,
        limit,
        total,
      },
    };
  });
};

export const getPublishedCoursesService = async (query: CourseQuery) => {
  return dbCall(async () => {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {
      isPublished: true,
    };

    if (query.search) {
      filter.title = { $regex: query.search, $options: "i" };
    }

    if (query.category) {
      filter.category = query.category;
    }

    if (query.level) {
      filter.level = query.level;
    }

    const [courses, total] = await Promise.all([
      Course.find(filter)
        .populate("teacherId", "name email avatar")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Course.countDocuments(filter),
    ]);

    return {
      courses,
      meta: {
        page,
        limit,
        total,
      },
    };
  });
};

export const getCourseByIdService = async (courseId: string) => {
  return dbCall(async () => {
    const course = await Course.findById(courseId).populate(
      "teacherId",
      "name email avatar"
    );

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    return course;
  });
};

export const updateCourseService = async (
  courseId: string,
  teacherId: string,
  payload: UpdateCoursePayload
) => {
  return dbCall(async () => {
    const course = await Course.findOne({
      _id: courseId,
      teacherId,
    });

    if (!course) {
      throw new AppError("Course not found or access denied", 404);
    }

    Object.assign(course, payload);

    await course.save();

    return course;
  });
};

export const deleteCourseService = async (
  courseId: string,
  teacherId: string
) => {
  return dbCall(async () => {
    const course = await Course.findOneAndDelete({
      _id: courseId,
      teacherId,
    });

    if (!course) {
      throw new AppError("Course not found or access denied", 404);
    }

    return course;
  });
};

export const publishCourseService = async (
  courseId: string,
  teacherId: string
) => {
  return dbCall(async () => {
    const course = await Course.findOne({
      _id: courseId,
      teacherId,
    });

    if (!course) {
      throw new AppError("Course not found or access denied", 404);
    }

    course.isPublished = true;

    await course.save();

    return course;
  });
};

export const unpublishCourseService = async (
  courseId: string,
  teacherId: string
) => {
  return dbCall(async () => {
    const course = await Course.findOne({
      _id: courseId,
      teacherId,
    });

    if (!course) {
      throw new AppError("Course not found or access denied", 404);
    }

    course.isPublished = false;

    await course.save();

    return course;
  });
};