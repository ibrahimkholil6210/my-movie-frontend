import React, { useEffect } from "react";
import { useFormik, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signinAsync, selectStatus, selectUser } from "./authSlice";
import Styles from "./Login.module.css";
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const LoginPage: React.FC = () => {
  const validationSchemas = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(6).max(16).required("Password is required"),
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemas,
    onSubmit: (data) => {
      console.log(data);
      dispatch(signinAsync(data.email, data.password, () => navigate("../")));
    },
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("../");
    }
  }, []);

  return (
    <div className={Styles.PageWrapper}>
      <div className={Styles.LoginForm}>
        <h1>Login</h1>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Input name="email" type="email" placeholder="Email" />
            <Input name="password" type="password" placeholder="Password" />
            <Button
              type="submit"
              label="Submit"
              disabled={status === "loading"}
            />
          </form>
        </FormikProvider>
        <div className={Styles.ActionButton}>
          <Button
            type="button"
            label="Signup"
            varient="secondary"
            onClick={() => {
              navigate("../signup");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
