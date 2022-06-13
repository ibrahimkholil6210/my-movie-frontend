import React from "react";
import Styles from "./List.module.css";

const List: React.FC<{}> = () => {
  return (
    <div className={Styles.MovieListContainer}>
      <div className={Styles.TitleContainer}>
        <h1>Movie List</h1>
      </div>
    </div>
  );
};

export default List;
