import React from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  cartItemsCount: number;
  setCartItemsCount: (count: number) => void;
  fetchCartItems: (userId: number) => void;
}

export const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => {},
  cartItemsCount: 0,
  setCartItemsCount: () => {},
  fetchCartItems: () => {},
});
