import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import layouts
import Navigation from "./layouts/Navigation/Navigation";
import Footer from "./layouts/Footer/Footer";

// Import pages
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";

// Import scss files
import "./assets/css/App.scss";

function App() {
  return (
    <>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
