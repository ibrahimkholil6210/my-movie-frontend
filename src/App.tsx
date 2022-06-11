import { Routes, Route } from "react-router-dom";
import { Counter } from "./features/counter/Counter";
import LoginPage from "./features/auth/Login";
import HomePage from "./Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
