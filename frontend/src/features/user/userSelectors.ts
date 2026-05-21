import { RootState } from "../../app/rootReducer";

/**
 * Get logged-in user
 */
export const selectCurrentUser = (state: RootState) => state.user.me;

/**
 * Get all users (Admin)
 */
export const selectAllUsers = (state: RootState) => state.user.users;

/**
 * Loading state
 */
export const selectUserLoading = (state: RootState) => state.user.loading;

/**
 * Error state
 */
export const selectUserError = (state: RootState) => state.user.error;

/**
 * Check if user is logged in
 */
export const selectIsAuthenticated = (state: RootState) =>
  Boolean(state.user.me);

/**
 * Get user role safely
 */
export const selectUserRole = (state: RootState) =>
  state.user.me?.role;

/**
 * Get user by ID from cached list (useful in admin panel)
 */
export const selectUserById = (userId: string) => (state: RootState) =>
  state.user.users.find((user: { _id: string; }) => user._id === userId) || null;