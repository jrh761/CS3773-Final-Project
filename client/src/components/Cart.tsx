import React, { useEffect, useState, useContext } from 'react';
import { Button, Offcanvas, Badge } from 'react-bootstrap';
import ApiService from '../utils/ApiService';
import CartItemComponent from './CartItem';
import { CartItem as CartItemType } from '../types';
import { UserContext } from '../context/UserContext';

type CartProps = {
  userId: number | null;
};

const Cart: React.FC<CartProps> = ({ userId }) => {
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const { setCartItemsCount } = useContext(UserContext);

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    setShow(true);
    await fetchCartItems();
  };

  const fetchCartItems = async () => {
    if (userId) {
      const response = await ApiService.get(`/cart?userId=${userId}`);
      if (response.data) {
        setCartItems(response.data);
        const totalQuantity = response.data.reduce(
          (sum: number, item: any) => sum + item.quantity,
          0,
        );
        setCartItemsCount(totalQuantity);
      } else {
        setCartItems([]);
        setCartItemsCount(0);
      }
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId, setCartItemsCount]);

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

  const handleRemoveItem = async (productId: number) => {
    const response = await ApiService.delete(
      `/cart/remove-item?userId=${userId}&productId=${productId}`,
    );

    if (response.status === 200) {
      const updatedItems = cartItems.filter(
        (item) => item.product.productId !== productId,
      );
      setCartItems(updatedItems);
      setCartItemsCount(updatedItems.length);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Cart
        <Badge pill bg="light" text="dark" className="ms-2">
          <UserContext.Consumer>
            {({ cartItemsCount }) => cartItemsCount}
          </UserContext.Consumer>
        </Badge>
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
                onRemoveItem={handleRemoveItem}
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
