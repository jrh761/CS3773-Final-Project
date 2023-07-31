
import { Buffer } from 'buffer';

export type DiscountCode = {
    id: number;
    code: string;
    dollarAmount: number;
}

export type User = {
    id: string;
    username: string;
}

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
  }
