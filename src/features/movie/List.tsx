import React, { useState, useMemo, useEffect } from "react";
import Table from "rc-table";
import debouce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import {
  getMovies,
  selectMovie,
  selectTotalCount,
  deleteMovie,
  selectStatus,
} from "../movie/movieSlice";
import Styles from "./List.module.css";
import InputStyles from "../../components/Input.module.css";
import Pagination from "../../components/Pagination";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Button } from "../../components/Button";
import UserInfo from "../../components/UserInfo";
import { getToken } from "../../lib/auth";

const List: React.FC<{}> = () => {
  const [search, setSearch] = useState("");
  const LIMIT = 10;
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMovie);
  const status = useAppSelector(selectStatus);
  const totalCount = useAppSelector(selectTotalCount);
  const navigation = useNavigate();
  const token = getToken();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    dispatch(getMovies(0, LIMIT, e.target.value, () => {}));
  };

  const handleDelete = (row: { _id: string }) => {
    dispatch(deleteMovie(row._id));
    dispatch(getMovies((page - 1) * 10, LIMIT, search, () => {}));
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Descripion",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnailUrl",
      key: "thumbnailUrl",
      render: (row: { thumbnailUrl: string }) => {
        return (
          <img
            alt="movie poster"
            src={
              row.thumbnailUrl ||
              "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg"
            }
            width="60px"
            height="60px"
          />
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "",
      key: "delete",
      render: (row: { _id: string }) => (
        <Button
          type="button"
          label="Delete"
          varient="secondary"
          onClick={() => {
            const confirmed = window.confirm("Are you sure?");
            if (!confirmed) return;
            handleDelete(row);
          }}
          style={{
            padding: "5px",
            fontSize: "14px",
            fontWeight: ".5rem",
            color: "red",
            borderColor: "red",
          }}
        />
      ),
    },
  ];

  const debouncedResults = useMemo(() => {
    return debouce(handleSearch, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  useEffect(() => {
    dispatch(
      getMovies(0, LIMIT, search, () => {
        navigation("../login", { replace: true });
      })
    );
  }, []);

  useEffect(() => {
    if (!token) {
      navigation("../login", { replace: true });
    }
  }, [token]);

  return (
    <div className={Styles.MovieListWrap}>
      <div className={Styles.MovieListContainer}>
        <div className={Styles.TitleContainer}>
          <div>
            <h1>Movie List</h1>
            <p>Here are all your favourite movie</p>
          </div>
          <UserInfo />
        </div>
        <div className={InputStyles.inputRow} style={{ gap: "0 20px" }}>
          <input
            name="search"
            onChange={debouncedResults}
            placeholder="Search movie..."
          />
          <Button
            type="button"
            label="Create New"
            varient="primary"
            onClick={() => {
              navigation("../movie/add");
            }}
            style={{ width: "160px" }}
          />
        </div>
        {status === "loading" ? (
          <div className={Styles.LoadingContainer}>
            <div className={Styles.ldsHourglass}></div>
          </div>
        ) : (
          <Table
            className={Styles.Table}
            columns={columns}
            data={false ? [] : movies}
            rowClassName={(row, key) =>
              `${key % 2 ? Styles.rowEven : Styles.rowOdd}`
            }
            emptyText={() => <div>No data available!</div>}
            rowKey={(obj) => obj._id}
          />
        )}
        <Pagination
          listPerPage={10}
          totalData={totalCount}
          paginateData={(page) => {
            console.log(page);
            setPage(page);
            dispatch(getMovies((page - 1) * 10, LIMIT, search, () => {}));
          }}
          className={Styles.Pagination}
        />
      </div>
    </div>
  );
};

export default List;
