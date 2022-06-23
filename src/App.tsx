import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Counter } from "./features/counter/Counter";
import { selectUser } from "./features/auth/authSlice";
import LoginPage from "./features/auth/Signin";
import MovieList from "./features/movie/List";
import SignupPage from "./features/auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAppSelector } from "./app/hooks";
import AddMoviePage from "./features/movie/AddMovie";

function App() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute >
              <MovieList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/counter"
          element={
            <ProtectedRoute >
              <Counter />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/movie/add"
          element={
            <ProtectedRoute >
              <AddMoviePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="top-center" theme="colored"/>
    </>
  );
}

export default App;
