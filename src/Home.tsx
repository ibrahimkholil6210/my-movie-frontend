import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { logout, selectUser } from "./features/auth/authSlice";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Home for movie</h1>
        <Link to={"/counter"}>Counter</Link>
        <Link to={"/login"}>Login</Link>
        {user.token && (
          <button
            onClick={() => {
              dispatch(logout());
              navigate("../login");
            }}
          >
            Logout
          </button>
        )}
      </header>
    </div>
  );
};

export default HomePage;
