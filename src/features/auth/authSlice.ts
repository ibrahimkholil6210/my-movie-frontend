import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  user: {
    userName: string;
    id: string;
    token: string;
  };
  status: "idle" | "loading" | "failed";
}

const initialState = {
  user: null,
  status: "idle",
};


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        }
    }
})

export default authSlice.reducer;