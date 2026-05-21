import Course from "../../models/CourseModel";
import Lesson from "../../models/LessonModel";
import { AppError } from "../../utils/appError";
import { dbCall } from "../../utils/dbCall";
import { CreateLessonPayload, UpdateLessonPayload } from "./lessonTypes";

const checkTeacherCourseAccess = async (
  courseId: string,
  teacherId: string
) => {
  const course = await Course.findOne({
    _id: courseId,
    teacherId,
  });

  if (!course) {
    throw new AppError("Course not found or access denied", 404);
  }

  return course;
};

export const createLessonService = async (
  courseId: string,
  teacherId: string,
  payload: CreateLessonPayload
) => {
  return dbCall(async () => {
    await checkTeacherCourseAccess(courseId, teacherId);

    const lesson = await Lesson.create({
      ...payload,
      courseId,
    });

    return lesson;
  });
};

export const getCourseLessonsService = async (
  courseId: string
) => {
  return dbCall(async () => {
    const course = await Course.findById(courseId);

    if (!course) {
      throw new AppError("Course not found", 404);
    }

    const lessons = await Lesson.find({ courseId }).sort({
      order: 1,
      createdAt: 1,
    });

    return lessons;
  });
};

export const getLessonByIdService = async (
  lessonId: string
) => {
  return dbCall(async () => {
    const lesson = await Lesson.findById(lessonId).populate(
      "courseId",
      "title teacherId isPublished"
    );

    if (!lesson) {
      throw new AppError("Lesson not found", 404);
    }

    return lesson;
  });
};

export const updateLessonService = async (
  lessonId: string,
  teacherId: string,
  payload: UpdateLessonPayload
) => {
  return dbCall(async () => {
    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      throw new AppError("Lesson not found", 404);
    }

    await checkTeacherCourseAccess(
      lesson.courseId.toString(),
      teacherId
    );

    Object.assign(lesson, payload);

    await lesson.save();

    return lesson;
  });
};

export const deleteLessonService = async (
  lessonId: string,
  teacherId: string
) => {
  return dbCall(async () => {
    const lesson = await Lesson.findById(lessonId);

    if (!lesson) {
      throw new AppError("Lesson not found", 404);
    }

    await checkTeacherCourseAccess(
      lesson.courseId.toString(),
      teacherId
    );

    await lesson.deleteOne();

    return lesson;
  });
};
