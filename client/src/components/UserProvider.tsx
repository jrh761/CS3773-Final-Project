import React, { useState, useEffect } from 'react'; // import useEffect
import { UserContext } from '../context/UserContext';
import { User } from '../types';

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const initialUserState = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null;
  const [user, setUser] = useState<User | null>(initialUserState);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
