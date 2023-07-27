import React from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
