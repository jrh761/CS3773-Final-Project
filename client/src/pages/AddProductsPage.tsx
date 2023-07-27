import React, { useEffect, useState } from 'react';
import PostProduct from '../components/PostProduct';
import GetProducts from '../components/GetProducts';
import { Col, Container, Row, Toast } from 'react-bootstrap';
import ApiService from '../utils/ApiService';
import { Product } from '../types';

const AddProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await ApiService.get('/products');
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Add Products</h1>
      <Container>
        <Row>
          <Col className="col-lg-3">
            <PostProduct
              setProducts={setProducts}
              products={products}
              showToastSuccess={(message: string) => {
                setToastMessage(message);
                setShowSuccessToast(true);
              }}
              showToastError={(message: string) => {
                setToastMessage(message);
                setShowErrorToast(true);
              }}
            />
          </Col>
          <Col className="col-lg-9">
            <GetProducts products={products} />
          </Col>
        </Row>
      </Container>

      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          padding: '10px',
          width: '300px',
          zIndex: 10,
        }}
      >
        <Toast
          onClose={() => setShowSuccessToast(false)}
          show={showSuccessToast}
          delay={3000}
          autohide
          className="bg-success text-white"
        >
          <Toast.Header>
            <strong className="me-auto">Product Creation</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>

        <Toast
          onClose={() => setShowErrorToast(false)}
          show={showErrorToast}
          delay={3000}
          autohide
          className="bg-danger text-white"
        >
          <Toast.Header>
            <strong className="me-auto">Product Creation</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </div>
    </div>
  );
};

export default AddProductsPage;
