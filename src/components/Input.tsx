import React from "react";
import { Field, ErrorMessage } from "formik";
import Styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  name: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ type, name, placeholder }) => {
  return (
    <>
      <div className={Styles.inputRow}>
        <Field type={type} name={name} placeholder={placeholder} />
      </div>
      <div>
        <ErrorMessage name={name} component="div" className={Styles.errorMessage} />
      </div>
    </>
  );
};

export default Input;
