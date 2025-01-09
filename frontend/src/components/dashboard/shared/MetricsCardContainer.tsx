import React, { ReactNode } from 'react';

interface MetricsCardContainerProps {
  children: ReactNode;
  className?: string;
}

export function MetricsCardContainer({ 
  children, 
  className = '' 
}: MetricsCardContainerProps) {
  return (
    <div 
      className={`
        bg-white 
        rounded-lg 
        shadow-md 
        border 
        border-gray-200 
        overflow-hidden
        ${className}
      `}
    >
      {children}
    </div>
  );
}