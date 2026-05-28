import { combineReducers } from "@reduxjs/toolkit";

// slices
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import courseReducer from "../features/course/courseSlice";
import assignmentReducer from "../features/assignment/assignmentSlice";
import submissionReducer from "../features/submission/submissionSlice";
import enrollmentReducer from "../features/enrollment/enrollmentSlice";
import notificationReducer from "../features/notification/notificationSlice";
import lessonReducer from "../features/lesson/lessonSlice";
import themeReducer from "../features/theme/themeSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  course: courseReducer,
  lesson: lessonReducer,
  assignment: assignmentReducer,
  submission: submissionReducer,
  enrollment: enrollmentReducer,
  notification: notificationReducer,
  theme: themeReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
