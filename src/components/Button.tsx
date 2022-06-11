import React from "react";
import Styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: (e: React.MouseEvent) => void;
}


export const Button: React.FC<ButtonProps> = ({ onClick, label, type }) => {
  return (
    <button className={Styles.createBtn} onClick={onClick} type={type}>
      {label}
    </button>
  );
};
