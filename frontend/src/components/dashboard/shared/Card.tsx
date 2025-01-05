// components/dashboard/shared/Card.tsx
/**
* Základní komponenta pro zobrazení obsahu v kartě
* - Poskytuje jednotný vzhled pro všechny karty v aplikaci
* - Zajišťuje konzistentní padding, stíny a zaoblené rohy
*/
import { ReactNode } from 'react';

interface CardProps {
 children: ReactNode;        // Obsah karty
 className?: string;        // Možnost přidat další CSS třídy
}

export default function Card({ children, className = '' }: CardProps) {
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