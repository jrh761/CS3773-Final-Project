import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

interface Product {
  productId: number;
  productName: string;
  price: number;
}

type Props = {
  products: Product[];
}

const GetProducts: React.FC<Props> = (props: Props) => {
  console.log(props.products)
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {props.products && props.products.map(product => (
          <tr key={product.productId}>
            <td>{product.productId}</td>
            <td>{product.productName}</td>
            <td>{product.price}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default GetProducts;