import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ApiService from '../utils/ApiService';

type Props = {
  setProducts: (products: any) => any;
  products: Array<any>;
};

const PostProduct: React.FC<Props> = (props: Props) => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const response = await ApiService.post('/products', {
      productName,
      price: Number(price),
    });
    props.setProducts([...props.products, response.data]);
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
