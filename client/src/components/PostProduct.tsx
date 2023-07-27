import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

type Props = {
  setProducts: (products: any) => any;
  products: Array<any>;
};

const PostProduct: React.FC<Props> = (props: Props) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productName, price: Number(price) }),
    });

    const data = await response.json();
    props.setProducts([...props.products, data]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="my-2" controlId="productName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="my-2" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          value={price === 0 ? '' : price}
          onChange={(e) =>
            setPrice(e.target.value === '' ? 0 : Number(e.target.value))
          }
        />
      </Form.Group>
      <Button className="my-2" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default PostProduct;
