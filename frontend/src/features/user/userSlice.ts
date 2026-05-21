import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/userTypes";
import {
  fetchMyProfile,
  fetchAllUsers,
  updateUserProfileThunk,
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
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    // ✏️ Update Profile
    builder.addCase(updateUserProfileThunk.fulfilled, (state, action) => {
      state.me = action.payload;
    });
  },
});

export const { clearUserState } = userSlice.actions;
export default userSlice.reducer;