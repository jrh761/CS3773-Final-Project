import React, { useEffect, useState } from 'react';
import { Button, Offcanvas, Badge } from 'react-bootstrap';
import ApiService from '../utils/ApiService';
import CartItemComponent from './CartItem';
import { CartItem as CartItemType } from '../types';

type CartProps = {
  userId: number | null;
};

const Cart: React.FC<CartProps> = ({ userId }) => {
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchCartItems = async () => {
    if (userId) {
      const response = await ApiService.get(`/cart?userId=${userId}`);
      if (response.data) {
        setCartItems(response.data);
      } else {
        setCartItems([]);
      }
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  const handleUpdateQuantity = async (
    productId: number,
    newQuantity: number,
  ) => {
    const response = await ApiService.put(`/cart/update`, {
      userId,
      productId,
      quantity: newQuantity,
    });

    if (response.status === 200) {
      fetchCartItems();
    }
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Cart
        {cartItemCount > 0 && (
          <Badge pill bg="light" text="dark" className="ms-2">
            {cartItemCount}
          </Badge>
        )}
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        scroll={false}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length ? (
            cartItems.map((item) => (
              <CartItemComponent
                key={item.product.productId}
                cartItem={item}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))
          ) : (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              Cart is empty
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Cart;
