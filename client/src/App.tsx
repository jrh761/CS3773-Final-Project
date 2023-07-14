import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./custom.scss";

import Home from "./pages/HomePage";
import { Container } from "react-bootstrap";

const App: React.FC = () => {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
