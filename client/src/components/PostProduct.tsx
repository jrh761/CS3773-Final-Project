import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ApiService from '../utils/ApiService';
import { Product } from '../types';

type Props = {
  setProducts: (products: any) => any;
  products: Product[];
  showToastSuccess: (message: string) => void;
  showToastError: (message: string) => void;
};

const PostProduct: React.FC<Props> = (props: Props) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (!productName || quantity === '' || price === '') {
      return;
    }

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('description', description);
    formData.append('quantity', String(quantity));
    formData.append('category', category);
    formData.append('price', String(price));
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await ApiService.post('/products', formData, true);
      props.setProducts([...props.products, response.data]);

      props.showToastSuccess(`Product ${productName} successfully created`);
    } catch (err) {
      props.showToastError('An error occurred.');
    }

    setSubmitted(false);
    resetForm();
  };

  const resetForm = () => {
    setProductName('');
    setDescription('');
    setQuantity('');
    setCategory('');
    setPrice('');
    setPhoto(null);
  };

  return (
    <Form onSubmit={handleSubmit} encType="multipart/form-data">
      <Form.Group className="my-2" controlId="productName">
        <Form.Label>Product Name *</Form.Label>
        <Form.Control
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          isInvalid={submitted && productName === ''}
        />
        <Form.Control.Feedback type="invalid">
          Product Name is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="my-2" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="my-2" controlId="quantity">
        <Form.Label>Quantity *</Form.Label>
        <Form.Control
          type="number"
          value={quantity === '' ? '' : quantity}
          onChange={(e) =>
            setQuantity(e.target.value === '' ? '' : Number(e.target.value))
          }
          isInvalid={submitted && quantity === ''}
        />
        <Form.Control.Feedback type="invalid">
          Quantity is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="my-2" controlId="category">
        <Form.Label>Category</Form.Label>
        <Form.Control
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="my-2" controlId="price">
        <Form.Label>Price *</Form.Label>
        <Form.Control
          type="number"
          value={price === '' ? '' : price}
          onChange={(e) =>
            setPrice(e.target.value === '' ? '' : Number(e.target.value))
          }
          isInvalid={submitted && price === ''}
        />
        <Form.Control.Feedback type="invalid">
          Price is required
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="my-2" controlId="photo">
        <Form.Label>Photo</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => {
            const input = e.target as HTMLInputElement;
            if (input.files) {
              setPhoto(input.files[0]);
            }
          }}
        />
      </Form.Group>

      <Button className="my-2" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default PostProduct;
