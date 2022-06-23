import React from "react";
import { useFormik, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { selectStatus, saveMovie } from "../movie/movieSlice";
import Styles from "../auth/Login.module.css";
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ISaveMovie } from "./types";

const AddMoviePage: React.FC = () => {
  const validationSchemas = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    thumbnailUrl: Yup.string().required("ThumbnailUrl is required"),
  });

  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      thumbnailUrl: "",
    },
    validationSchema: validationSchemas,
    onSubmit: (data: ISaveMovie, formikHelper) => {
      dispatch(saveMovie(data, () => formikHelper.resetForm()));
    },
  });

  return (
    <div className={Styles.PageWrapper}>
      <div className={Styles.LoginForm}>
        <h1>Add Your Favourite Movie</h1>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Input name="title" type="text" placeholder="Title" />
            <Input name="description" type="text" placeholder="Description" />
            <Input name="thumbnailUrl" type="text" placeholder="ThumbnailUrl" />
            <Button
              type="submit"
              label={status === "loading" ? "Saving" : "Save"}
              disabled={status === "loading"}
            />
          </form>
        </FormikProvider>
        <div className={Styles.ActionButton}>
          <Button
            type="button"
            label="Back to Movie List"
            varient="secondary"
            onClick={() => {
              navigate("../");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddMoviePage;
