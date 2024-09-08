import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./view/Home";

import Signup from "./view/Signup";
import Login from "./view/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
