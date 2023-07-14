import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./custom.scss";

import Home from "./pages/HomePage";
import TestPage from "./pages/TestPage";

const App: React.FC = () => {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test-page" element={<TestPage />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
