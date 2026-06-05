import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/userTypes";
import {
  fetchMyProfile,
  fetchAllUsers,
  updateUserProfileThunk,
  deleteUserThunk,
  updateUserStatusThunk,
} from "./userThunks";

interface UserState {
  me: IUser | null;
  users: IUser[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  me: null,
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserState: (state) => {
      state.me = null;
      state.users = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // 👤 My Profile
    builder.addCase(fetchMyProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMyProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.me = action.payload;
    });
    builder.addCase(fetchMyProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch profile";
    });

    // 👥 All Users (Admin)
    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch users";
    });

    // ✏️ Update Profile
    builder.addCase(updateUserProfileThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserProfileThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.me = action.payload;
    });
    builder.addCase(updateUserProfileThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to update profile";
    });

    // 🗑️ Delete User
    builder.addCase(deleteUserThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.filter((user) => user._id !== action.payload);
    });
    builder.addCase(deleteUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to delete user";
    });

    // 🚦 Update User Status
    builder.addCase(updateUserStatusThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUserStatusThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    });
    builder.addCase(updateUserStatusThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to update user status";
    });
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;