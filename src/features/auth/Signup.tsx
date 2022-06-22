import React from "react";
import { useFormik, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signupAsync, selectStatus, selectUser } from "../auth/authSlice";
import Styles from "./Login.module.css";
import Input from "../../components/Input";
import { Button } from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const SignupPage: React.FC = () => {
  const validationSchemas = Yup.object().shape({
    userName: Yup.string().required("User name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(6).max(16).required("Password is required"),
  });

  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const user = useAppSelector(selectUser);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchemas,
    onSubmit: (data,formikHelper) => {
      const { userName, email, password } = data;
      console.log(formikHelper);
      dispatch(signupAsync(userName, email, password,() => navigate("../login")));
    },
  });

  return (
    <div className={Styles.PageWrapper}>
      <div className={Styles.LoginForm}>
        <h1>Signup</h1>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Input name="userName" type="text" placeholder="User Name" />
            <Input name="email" type="email" placeholder="Email" />
            <Input name="password" type="password" placeholder="Password" />
            <Button type="submit" label="Submit" disabled={status === 'loading'} />
          </form>
        </FormikProvider>
        <div className={Styles.ActionButton}>
          <Button
            type="button"
            label="Login"
            varient="secondary"
            onClick={() => {
              navigate("../login");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
