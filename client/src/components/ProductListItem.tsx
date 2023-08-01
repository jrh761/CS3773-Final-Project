import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { Product } from '../types';
import { Buffer } from 'buffer';

type Props = {
  product: Product;
  addToCart: (productId: number) => void;
};

const ProductListItem: React.FC<Props> = ({ product, addToCart }) => {
  const handleAddToCart = (event: React.MouseEvent, productId: number) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(productId);
  };

  const image =
    product.photo &&
    product.photo.data &&
    `data:${product.photo.type};base64,${Buffer.from(
      product.photo.data,
    ).toString('base64')}`;

  const imageUrl = image || '/placeholder.png';

  return (
    <Link
      to={`/product/${product.productId}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card style={{ height: '100%' }}>
        <Card.Img
          variant="top"
          src={imageUrl}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-truncate">
            {product.productName}
          </Card.Title>
          <Card.Text className="text-truncate">{product.description}</Card.Text>
          <Card.Text>${product.price}</Card.Text>
          <Card.Text>Availability: {product.quantity} in stock</Card.Text>
          <Button
            onClick={(event) => handleAddToCart(event, product.productId)}
            className="mt-auto align-self-end"
          >
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default ProductListItem;
