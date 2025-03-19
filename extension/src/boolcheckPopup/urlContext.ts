import { createContext, useContext } from 'react';

export const UrlContext = createContext<string | undefined>(undefined);

export const useUrl = () => {
  return useContext(UrlContext);
};
