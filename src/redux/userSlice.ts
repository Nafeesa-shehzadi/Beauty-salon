import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  username: string;
  email: string;
  password: string; // Keep the password for simplicity (not recommended for production)
  phone: string; // Add phone number
  profileImage?: string; // Add profile image
  isAdmin: boolean; // Add isAdmin property
}

interface UserState {
  users: User[];
  currentUser: User | null; // Track the currently logged-in user
  isAuthenticated: boolean; // Track authentication state
  searchTerm: string; // Add searchTerm to track the current search term
  filteredUsers: User[]; // Add filteredUsers to track the filtered users
}

const initialState: UserState = {
  users: [],
  currentUser: null,
  isAuthenticated: false,
  searchTerm: "",
  filteredUsers: [], // Initialize filteredUsers
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerUser(state, action: PayloadAction<User>) {
      const existingUser = state.users.find(
        (user) => user.email === action.payload.email
      );
      if (!existingUser) {
        state.users.push(action.payload); // Add user if they do not exist
      } else {
        console.error("User already exists!"); // Log the message but do not add the user
      }
    },
    loginUser(
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) {
      const user = state.users.find(
        (u) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );
      if (user) {
        state.currentUser = user;
        state.isAuthenticated = true;
        console.log("User logged in successfully!");
      } else {
        console.error("Invalid email or password");
      }
    },
    logoutUser(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    updateUser(state, action: PayloadAction<User>) {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload; // Update the user data
      }
    },
    updateUserRole(
      state,
      action: PayloadAction<{ userId: number; isAdmin: boolean }>
    ) {
      const { userId, isAdmin } = action.payload;
      const user = state.users.find((user) => user.id === userId);
      if (user) {
        user.isAdmin = isAdmin; // Update user admin status
      }
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload); // Delete user by ID
    },
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.filteredUsers = state.users.filter((user) =>
        user.username.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    resetFilteredUsers(state) {
      state.filteredUsers = state.users;
    },
    updateProfileImage(
      state,
      action: PayloadAction<{ id: number; newImage: string }>
    ) {
      const user = state.users.find((user) => user.id === action.payload.id);
      if (user) {
        user.profileImage = action.payload.newImage; // Update the user's profile image
      }
    },
  },
});

export const {
  registerUser,
  loginUser,
  logoutUser,
  updateUser,
  updateUserRole, // Export the updateUserRole action
  deleteUser,
  setSearchTerm,
  resetFilteredUsers,
  updateProfileImage, // Export the new action
} = userSlice.actions;
export default userSlice.reducer;
