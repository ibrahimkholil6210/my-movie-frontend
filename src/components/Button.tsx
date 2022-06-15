import React from "react";
import Styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  varient?: "primary" | "secondary";
}


export const Button: React.FC<ButtonProps> = ({ onClick, label, type, varient='primary' }) => {
  
  if(varient === 'secondary'){
    return (
      <button className={`${Styles.createBtn} ${Styles.secondaryBtn}`} onClick={onClick} type={type}>
        {label}
      </button>
    );
  }

  return (
    <button className={Styles.createBtn} onClick={onClick} type={type}>
      {label}
    </button>
  );
  
};
