import React from 'react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-8 h-8 border-2 border-border border-t-primary rounded-full animate-spin"></div>
      <p className="mt-4 text-sm text-secondary">{message}</p>
    </div>
  );
};

export default Loading;
