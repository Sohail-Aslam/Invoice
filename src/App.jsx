import { useState } from "react";
import "./App.css";
import Invoice from "./component/invoice";
import Login from "./auth/login";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Invoice />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
