import React from 'react';
import { Button, Card } from 'react-bootstrap';
import ApiService from '../utils/ApiService';
import { CartItem as CartItemType } from '../types';

type CartItemProps = {
  cartItem: CartItemType;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({ cartItem, onUpdateQuantity }) => {
  const { product, quantity } = cartItem;

  const handleIncrement = async () => {
    const response = await ApiService.post(`/cart/add`, {
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
      const response = await ApiService.post(`/cart/add`, {
        userId: cartItem.userId,
        productId: product.productId,
        quantity: quantity - 1,
      });

      if (response.success) {
        onUpdateQuantity(product.productId, response.data.quantity);
      }
    }
  };

  const image =
    product.photo &&
    product.photo.data &&
    `data:${product.photo.type};base64,${Buffer.from(
      product.photo.data,
    ).toString('base64')}`;

  const imageUrl = image || '/placeholder.png';

  return (
    <Card className="mb-3">
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={product.productName}
      ></Card.Img>
      <Card.Body>
        <Card.Title>{product.productName}</Card.Title>
        <Card.Text>
          Price: ${product.price} <br />
          Quantity: {quantity}
        </Card.Text>
        <Button variant="primary" onClick={handleIncrement}>
          +
        </Button>{' '}
        <Button variant="secondary" onClick={handleDecrement}>
          -
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
