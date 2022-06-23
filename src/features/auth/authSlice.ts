import { AxiosError } from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { AppThunk, RootState } from "../../app/store";
import client from "../../lib/axios";

const user = JSON.parse(localStorage.getItem("user") || "{}");

export interface AuthState {
  user: {
    userName?: string;
    id?: string;
    token?: string;
  };
  status: "idle" | "loading" | "failed";
}

const initialState: AuthState = {
  user,
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setUser, setStatus } = authSlice.actions;

export const selectStatus = (state: RootState) => state.auth.status;
export const selectUser = (state: RootState) => state.auth.user;

export const signupAsync =
  (
    userName: string,
    email: string,
    password: string,
    callBack: () => void
  ): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      const signupRes = await client.post("/users/signup", {
        userName,
        email,
        password,
      });
      dispatch(setStatus("idel"));
      signupRes.data.isCreated && callBack();
    } catch (err: AxiosError | any) {
      dispatch(setStatus("error"));
      toast.error(err?.response?.data?.message, {
        onClose: () => {
          dispatch(setStatus("idle"));
        },
      });
    }
  };

export const signinAsync =
  (email: string, password: string, callBack: () => void): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      const signinRes = await client.post("/auth/login", {
        email,
        password,
      });
      dispatch(setStatus("idel"));
      dispatch(
        setUser({
          token: signinRes.data.token,
          email: signinRes.data.email,
          userName: signinRes.data.userName,
        })
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: signinRes.data.email,
          userName: signinRes.data.userName,
        })
      );
      localStorage.setItem("token", JSON.stringify(signinRes.data.token));
      signinRes.data && callBack();
    } catch (err: AxiosError | any) {
      dispatch(setStatus("error"));
      toast.error(err?.response?.data?.message, {
        onClose: () => {
          dispatch(setStatus("idle"));
        },
      });
    }
  };

export const logout = (): AppThunk => (dispatch) => {
  dispatch(setUser({}));
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export default authSlice.reducer;
