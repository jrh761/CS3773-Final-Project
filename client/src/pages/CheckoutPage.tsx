import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Form,
  Col,
  Row,
  Alert,
  ListGroup,
  Card,
  Modal,
} from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import ApiService from '../utils/ApiService';
import { CartItem as CartItemType } from '../types';
import CartItem from '../components/CartItem';
import './CheckoutPage.css';
import { useNavigate } from 'react-router-dom';

type UserInfo = {
  [key: string]: string;
};

// Utility function to convert camelCase into sentence case
const formatCamelCase = (s: string) => {
  return s.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase();
  });
};

const CheckoutPage: React.FC = () => {
  const { user, fetchCartItems } = useContext(UserContext);
  const navigate = useNavigate();

  const [userInformation, setUserInformation] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    ccvNumber: '',
  });

  const [error, setError] = useState<Partial<typeof userInformation>>({});
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [showModal, setShowModal] = useState(false);

  const fetchCart = async () => {
    const response = await ApiService.get(`/cart?userId=${user?.id}`);
    if (response.data) {
      setCartItems(response.data);
    }
  };

  const handleUpdateQuantity = async (
    productId: number,
    newQuantity: number,
  ) => {
    const response = await ApiService.put(`/cart/update`, {
      userId: user?.id,
      productId,
      quantity: newQuantity,
    });

    if (response.success) {
      fetchCartItems(user?.id as number);
      fetchCart();
    }
  };

  const handleRemoveItem = async (productId: number) => {
    const response = await ApiService.delete(
      `/cart/remove-item?userId=${user?.id}&productId=${productId}`,
    );

    if (response.status === 200) {
      fetchCartItems(user?.id as number);
      fetchCart();
    }
  };

  useEffect(() => {
    if (user) fetchCart();
  }, [user]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInformation({
      ...userInformation,
      [event.target.name]: event.target.value,
    });
  };

  const handleDiscountCodeChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const enteredCode = event.target.value;
    setDiscountCode(enteredCode);
    if (enteredCode) {
      const response = await ApiService.get(`/discount-code/${enteredCode}`);
      if (response.status === 200) {
        setDiscountApplied(true);
      } else {
        setDiscountApplied(false);
      }
    } else {
      setDiscountApplied(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newError: Partial<typeof userInformation> = {};
    for (let key in userInformation) {
      if (!userInformation[key]) {
        newError[key] = 'This field is required';
      }
    }
    if (Object.keys(newError).length) {
      setError(newError);
    } else {
      try {
        const response = await ApiService.post('/orders/checkout', {
          userInformation,
          cartItems,
        });
        if (response.status === 200) {
          setShowModal(true);
        } else {
          alert('Checkout failed. Please try again.');
        }
      } catch (error) {
        alert('Error during checkout. Please try again.');
      }
    }
  };

  const totalWithoutTax = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const taxAmount = totalWithoutTax * 0.0825;
  const discountTotal = discountApplied ? totalWithoutTax * 0.1 : 0;
  const finalTotal = totalWithoutTax + taxAmount - discountTotal;

  return (
    <div>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit} className="checkout-form">
            {Object.keys(userInformation).map((key) => (
              <Form.Group as={Row} key={key}>
                <Form.Label column sm={4}>
                  {formatCamelCase(key)}
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name={key}
                    value={userInformation[key]}
                    onChange={handleInputChange}
                    isInvalid={!!error[key]}
                    className="mb-3"
                  />
                  <Form.Control.Feedback type="invalid">
                    {error[key]}
                  </Form.Control.Feedback>
                </Col>
              </Form.Group>
            ))}
            <Form.Group as={Row}>
              <Form.Label column sm={4}>
                Discount Code
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="discountCode"
                  value={discountCode}
                  onChange={handleDiscountCodeChange}
                  className="mb-3"
                />
              </Col>
            </Form.Group>
            {discountApplied && (
              <Alert variant="success" className="my-3 mx-5">
                Discount applied successfully!
              </Alert>
            )}
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <Card className="p-3 mb-3">
            <ListGroup>
              {cartItems.map((item, index) => (
                <CartItem
                  key={index}
                  cartItem={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </ListGroup>
          </Card>
          <p className="mt-3">
            <i>Total without tax: {totalWithoutTax.toFixed(2)}</i>
          </p>
          <p>
            <i>Tax amount: {taxAmount.toFixed(2)}</i>
          </p>
          {discountApplied && (
            <p>
              Discount total:{' '}
              <span className="text-danger">-{discountTotal.toFixed(2)}</span>
            </p>
          )}
          <h4 className="mt-3 font-weight-bold">
            Final Total: {finalTotal.toFixed(2)}
          </h4>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order placed successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your order will be shipped as soon as possible. Thank you!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
