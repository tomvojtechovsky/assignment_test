// components/dashboard/shared/Card.tsx
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;        // Obsah karty
  className?: string;        // Možnost přidat další CSS třídy
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div 
      className={`
        bg-white 
        rounded-lg 
        shadow-md 
        p-6 
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardStyled({ children, className = '' }: CardProps) {
  return (
    <div 
      className={`
        rounded-lg 
        shadow-md 
        p-6 
        ${className}
      `}
      style={{ background: '#ece9f9', border: 'solid 1px #eda1fb' }}
    >
      {children}
    </div>
  );
}