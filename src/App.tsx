import React from "react";
import { AppLayout } from "./components";
import  Home  from "../src/pages/Home";
import "@/styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="*" element={<Home/>} />
          
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
