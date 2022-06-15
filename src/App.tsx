import { Routes, Route } from "react-router-dom";
import { Counter } from "./features/counter/Counter";
import LoginPage from "./features/auth/Login";
import HomePage from "./Home";
import MovieList from "./features/movie/List";
import SignupPage from './features/auth/Signup'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/movie/list" element={<MovieList />} />
      </Routes>
    </>
  );
}

export default App;
