import React, { useState } from 'react';
import { Table, Modal } from 'react-bootstrap';
import { Product } from '../../types';
import { Buffer } from 'buffer';

type Props = {
  products: Product[];
};

const ProductTableCreate: React.FC<Props> = (props: Props) => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setModalShow(true);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Photo</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {props.products &&
            props.products.map((product) => {
              const image =
                product.photo &&
                product.photo.data &&
                `data:${product.photo.type};base64,${Buffer.from(
                  product.photo.data,
                ).toString('base64')}`;

              const imageUrl = image || '/placeholder.png';

              return (
                <tr key={product.productId}>
                  <td>{product.productId}</td>
                  <td>{product.productName}</td>
                  <td>{product.description}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category}</td>
                  <td>
                    {product.photo && product.photo.data ? (
                      <img
                        src={imageUrl}
                        alt={product.productName}
                        style={{
                          maxHeight: '50px',
                          width: 'auto',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleImageClick(imageUrl)}
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td>{product.price}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <Modal
        size="lg"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="image-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="image-modal">Product Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedImage}
            alt="Product"
            style={{ maxHeight: '300px', width: 'auto' }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductTableCreate;
