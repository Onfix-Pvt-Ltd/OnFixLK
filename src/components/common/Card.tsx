import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark' | 'glass' | 'glow';
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'light',
  onClick,
  hoverEffect = true,
}) => {
  const cardClass = `card card-${variant} ${hoverEffect ? 'card-hover' : ''} ${
    onClick ? 'card-clickable' : ''
  } ${className}`;

  return (
    <div className={cardClass} onClick={onClick}>
      {children}
    </div>
  );
};
