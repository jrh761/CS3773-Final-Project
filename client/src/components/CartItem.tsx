import React from 'react';
import { Button, Col, Row, Image } from 'react-bootstrap';
import ApiService from '../utils/ApiService';
import { CartItem as CartItemType } from '../types';
import { Buffer } from 'buffer';

type CartItemProps = {
  cartItem: CartItemType;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  cartItem,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  const { product, quantity } = cartItem;

  const handleIncrement = async () => {
    const response = await ApiService.put(`/cart/update`, {
      userId: cartItem.userId,
      productId: product.productId,
      quantity: quantity + 1,
    });

    if (response.success) {
      onUpdateQuantity(product.productId, response.data.quantity);
    }
  };

  const handleDecrement = async () => {
    if (quantity > 1) {
      const response = await ApiService.put(`/cart/update`, {
        userId: cartItem.userId,
        productId: product.productId,
        quantity: quantity - 1,
      });

      if (response.success) {
        onUpdateQuantity(product.productId, response.data.quantity);
      }
    }
  };

  const handleRemoveItem = () => {
    onRemoveItem(product.productId);
  };

  const image =
    product.photo &&
    product.photo.data &&
    `data:${product.photo.type};base64,${Buffer.from(
      product.photo.data,
    ).toString('base64')}`;

  const imageUrl = image || '/placeholder.png';

  return (
    <Row
      className="align-items-center mb-3 px-1 py-3 mx-1"
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
        maxHeight: '100px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Col xs={3}>
        <Image
          src={imageUrl}
          alt={product.productName}
          thumbnail
          style={{ height: '50px', width: '50px', objectFit: 'cover' }}
        />
      </Col>
      <Col xs={9}>
        <Row>
          <Col className="text-truncate" style={{ fontSize: '0.9rem' }}>
            <h5 style={{ fontSize: '0.95rem' }}>{product.productName}</h5>
            <p>Price: ${product.price}</p>
          </Col>
          <Col
            xs="auto"
            className="d-flex align-items-center justify-content-between"
          >
            <Button
              variant="primary"
              onClick={handleDecrement}
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
            >
              -
            </Button>
            <div className="px-2">{quantity}</div>
            <Button
              variant="primary"
              onClick={handleIncrement}
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
            >
              +
            </Button>
          </Col>
        </Row>
        <Button
          onClick={handleRemoveItem}
          className="mt-1"
          style={{
            position: 'absolute',
            top: '0px',
            right: '8px',
            padding: '0',
            border: 'none',
            background: 'none',
          }}
        >
          <Image
            src="/trash-can.png"
            alt="Delete"
            style={{ width: '16px', height: '16px' }}
          />
        </Button>
      </Col>
    </Row>
  );
};

export default CartItem;
