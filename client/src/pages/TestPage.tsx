import React, { useEffect, useState } from "react";
import PostProduct from "../components/PostProduct";
import GetProducts from "../components/GetProducts";
import { Col, Container, Row } from "react-bootstrap";

interface Product {
  productId: number;
  productName: string;
  price: number;
}

const TestPage: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/products`);
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
      <Container>
        <Row>
          <Col>
            <PostProduct setProducts={setProducts} products={products} />
          </Col>
          <Col>
            <GetProducts products={products} />
          </Col>
        </Row>


      </Container>
    </div>
  );
};

export default TestPage;
