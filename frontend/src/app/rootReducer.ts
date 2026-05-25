import { combineReducers } from "@reduxjs/toolkit";

// slices 
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import courseReducer from "../features/course/courseSlice";
import lessonReducer from "../features/lesson/lessonSlice";
import assignmentReducer from "../features/assignment/assignmentSlice";
import submissionReducer from "../features/submission/submissionSlice";
import enrollmentReducer from "../features/enrollment/enrollmentSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  course: courseReducer,
  lesson: lessonReducer,
  assignment: assignmentReducer,
  submission: submissionReducer,
  enrollment: enrollmentReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
