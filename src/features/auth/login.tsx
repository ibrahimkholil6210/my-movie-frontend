import React from "react";
import { useFormik, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Styles from "./Login.module.css";
import Input from "../../components/Input";
import { Button } from "../../components/Button";

const LoginPage: React.FC = () => {
  const validationSchemas = Yup.object().shape({
    userName: Yup.string().required("User name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(6).max(16).required("Password is required"),
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchemas,
    onSubmit: (data) => {
      console.log(data);
      navigate("../movie/list");
    },
  });

  return (
    <div className={Styles.PageWrapper}>
      <div className={Styles.LoginForm}>
        <h1>Login</h1>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Input name="userName" type="text" placeholder="User Name" />
            <Input name="email" type="email" placeholder="Email" />
            <Input name="password" type="password" placeholder="Password" />
            <Button type="submit" label="Submit" />
          </form>
        </FormikProvider>
      </div>
    </div>
  );
};

export default LoginPage;
