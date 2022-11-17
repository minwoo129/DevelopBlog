import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";

function App() {
  return (
    <Routes>
      <Route element={<Main />} path="/*" />
    </Routes>
  );
}

export default App;
