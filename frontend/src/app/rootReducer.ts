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

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  course: courseReducer,
  assignment: assignmentReducer,
  submission: submissionReducer,
  enrollment: enrollmentReducer,
  notification: notificationReducer,
  lesson: lessonReducer
});

export default rootReducer;
