import { createSlice } from "@reduxjs/toolkit";

// Retrieve name from local storage with fallback to empty string
const nameFromLocalStorage = localStorage.getItem("name");
const initialName = nameFromLocalStorage ? JSON.parse(nameFromLocalStorage) : "";

// Define initial state
const initialState = {
  isLoggedIn: false,
  name: initialName,
  user: {
    name: "",
    email: "",
    password: "",
    phone: "",
    photo: ""
  },
};

// Create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin(state, action) {
      state.isLoggedIn = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
      localStorage.setItem("name", JSON.stringify(action.payload));
    },
    setUser(state, action) {
      const profile = action.payload;
      state.user = profile;
    },
  },
});

// Export actions
export const { setLogin, setName, setUser } = authSlice.actions;

// Export selectors
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;

// Export reducer
export default authSlice.reducer;
