import { Buffer } from 'buffer';

export type DiscountCode = {
  id: number;
  code: string;
  dollarAmount: number;
};

export type User = {
  id: number;
  username: string;
};

export type Product = {
  productId: number;
  productName: string;
  description: string;
  quantity: number;
  category: string;
  photo: {
    data: Buffer;
    type: string;
  };
  price: number;
};

export type CartItem = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  product: Product;
};

export type Discount = {
  dollarAmount: number;
  code: string;
};
