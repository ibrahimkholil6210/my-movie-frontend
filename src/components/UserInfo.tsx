import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./UserInfo.module.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectUser, logout } from "../features/auth/authSlice";
import useOutsideClick from "../hooks/useOutsideClick";

const UserInfo: React.FC = () => {
  const user = useAppSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setIsOpen(false));
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  return (
    <div className={Styles.DropdownContainer} ref={wrapperRef}>
      <div className={Styles.AvatarImg} onClick={() => setIsOpen(!isOpen)}>
        {user?.userName?.slice(0,1)}
      </div>
      {isOpen && (
        <div className={Styles.DropdownBtnContainer}>
          <div className={Styles.ArrowUp}></div>
          <span>{user.userName} (you)</span>
          <button onClick={() => {
            dispatch(logout())
            navigate("../login")
          }}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
