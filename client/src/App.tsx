import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './custom.scss';

import Home from './pages/HomePage';
import AddProductsPage from './pages/AddProductsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import AddDiscountCodePage from './pages/AddDiscountCodePage';
import ProductDetailsPage from './pages/ProductDetailsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-discount-code" element={<AddDiscountCodePage />} />
          <Route path="/add-product" element={<AddProductsPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
