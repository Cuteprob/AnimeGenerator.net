'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import FullPageLoader from '@/components/ui/loading/FullPageLoader';

interface LoadingContextType {
  setLoading: (isLoading: boolean, message?: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSetLoading = (isLoading: boolean, msg: string = 'Loading...') => {
    setLoading(isLoading);
    setMessage(msg);
  };

  return (
    <LoadingContext.Provider value={{ setLoading: handleSetLoading }}>
      {children}
      {loading && <FullPageLoader message={message} />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
