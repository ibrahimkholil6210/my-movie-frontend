import { createSlice } from "@reduxjs/toolkit";
import request from "axios";
import { RootState, AppThunk } from "../../app/store";
import client from "../../lib/axios";
import { ISaveMovie } from "./types";
import { logout } from "../auth/authSlice";

export interface MovieState {
  movies: any[];
  status: "idle" | "loading" | "failed";
  totalCount: number;
}

const initialState: MovieState = {
  movies: [],
  status: "idle",
  totalCount: 0,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
  },
});

export const { setMovies, setStatus, setTotalCount } = movieSlice.actions;

export const selectMovie = (state: RootState) => state.movie.movies;
export const selectTotalCount = (state: RootState) => state.movie.totalCount;
export const selectStatus = (state: RootState) => state.movie.status;

export const getMovies =
  (
    offset: number,
    limit: number,
    search: string,
    errorCallBack: () => void
  ): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      const apiRes = await client.get(
        `/movies?offset=${offset}&limit=${limit}&search=${search}`
      );
      dispatch(setMovies(apiRes.data.list));
      dispatch(setTotalCount(apiRes.data.totalCount));
      dispatch(setStatus("idle"));
    } catch (err) {
      console.log(err);
      if (request.isAxiosError(err) && err?.response?.status === 401) {
        dispatch(logout())
        errorCallBack();
      }
      dispatch(setStatus("failed"));
    }
  };

export const saveMovie =
  (data: ISaveMovie, successCallBack?: () => void): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      await client.post("/movies", data);
      dispatch(setStatus("idle"));
      successCallBack && successCallBack();
    } catch (err) {
      console.log(err);
      if (request.isAxiosError(err) && err?.response?.status === 401) {
        dispatch(logout())
      }
      dispatch(setStatus("failed"));
    }
  };

export const deleteMovie =
  (id: string): AppThunk =>
  (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      client.delete(`/movies/${id}`);
      dispatch(setStatus("idle"));
    } catch (err) {
      console.log(err);
      dispatch(setStatus("failed"));
    }
  };

export default movieSlice.reducer;
