import React, { useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { User } from '../types';
import ApiService from '../utils/ApiService';

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const initialUserState = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null;
  const [user, setUser] = useState<User | null>(initialUserState);
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      fetchCartItems(user.id);
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const fetchCartItems = async (userId: number) => {
    const response = await ApiService.get(`/cart?userId=${userId}`);
    if (response.data) {
      const totalQuantity = response.data.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0,
      );
      setCartItemsCount(totalQuantity);
    } else {
      setCartItemsCount(0);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        cartItemsCount,
        setCartItemsCount,
        fetchCartItems,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
