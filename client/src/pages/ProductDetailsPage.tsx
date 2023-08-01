import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import ApiService from '../utils/ApiService';
import { Product } from '../types';
import { Buffer } from 'buffer';

const ProductDetailsPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await ApiService.get(`/products/${productId}`);
      if (response.success) {
        setProduct(response.data);
      } else {
        console.error(response.message);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const image =
    product.photo &&
    product.photo.data &&
    `data:${product.photo.type};base64,${Buffer.from(
      product.photo.data,
    ).toString('base64')}`;

  const imageUrl = image || '/placeholder.png';

  return (
    <Container>
      <Row>
        <Col sm={12} md={6}>
          <Card.Img variant="top" src={imageUrl} />
        </Col>
        <Col sm={12} md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{product.productName}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>${product.price}</Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  // Add cart function
                }}
              >
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsPage;
