import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const HomePage: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Home for movie</h1>
        <Link to={"/counter"}>Counter</Link>
        <Link to={"/login"}>Login</Link>
      </header>
    </div>
  );
};

export default HomePage;
