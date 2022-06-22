import React from "react";
import Styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  varient?: "primary" | "secondary";
  disabled?: boolean;
  style?: React.CSSProperties;
}


export const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  type,
  varient = "primary",
  disabled,
  style,
}) => {
  if (varient === "secondary") {
    return (
      <button
        className={`${Styles.createBtn} ${Styles.secondaryBtn}`}
        onClick={onClick}
        type={type}
        disabled={disabled}
        style={style}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      className={Styles.createBtn}
      onClick={onClick}
      type={type}
      disabled={disabled}
      style={style}
    >
      {label}
    </button>
  );
};
