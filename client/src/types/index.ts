
import { Buffer } from 'buffer';

export type User = {
    username: string;
    id: string;
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