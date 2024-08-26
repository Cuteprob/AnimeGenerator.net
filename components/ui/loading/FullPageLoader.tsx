import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface FullPageLoaderProps {
  message?: string;
}

const FullPageLoader: React.FC<FullPageLoaderProps> = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex flex-col justify-center items-center z-50">
      <LoadingSpinner size="large" />
      <p className="mt-4 text-lg font-semibold text-gray-700">{message}</p>
    </div>
  );
};

export default FullPageLoader;