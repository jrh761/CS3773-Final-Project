import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

type Props = {
  product: Product;
  addProduct: (productId: number, quantity: number) => void;
};

const ProductListItem: React.FC<Props> = ({ product, addProduct }) => {
  return (
    <div>
      <Link to={`/product/${product.productId}`}>
        <h2>{product.productName}</h2>
        <p>
          {product.description.length > 100
            ? product.description.substring(0, 97) + '...'
            : product.description}
        </p>
        <p>{product.price}</p>
        <p>Available: {product.quantity}</p>
      </Link>
      <button onClick={() => addProduct(product.productId, 1)}>
        Add to cart
      </button>
    </div>
  );
};

export default ProductListItem;
