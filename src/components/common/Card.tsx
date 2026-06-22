import React from 'react';

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
  const baseClass = `rounded-large p-8 overflow-hidden relative transition-all duration-300 ease-out`;

  const variantClasses = {
    light: `bg-bg-card border border-border-light shadow-subtle text-text-dark ${
      hoverEffect ? 'hover:-translate-y-1.5 hover:shadow-medium hover:border-accent/30' : ''
    }`,
    dark: `bg-bg-dark border border-border-dark text-text-light ${
      hoverEffect ? 'hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]' : ''
    }`,
    glass: `glass shadow-subtle text-text-dark ${
      hoverEffect ? 'hover:-translate-y-1.5 hover:border-accent hover:shadow-medium' : ''
    }`,
    glow: `bg-bg-card border border-accent/20 shadow-glow text-text-dark ${
      hoverEffect ? 'hover:-translate-y-1.5 hover:shadow-glow-strong hover:border-accent' : ''
    }`,
  };

  const cardClass = `${baseClass} ${variantClasses[variant]} ${
    onClick ? 'cursor-pointer' : ''
  } ${className}`;

  return (
    <div className={cardClass} onClick={onClick}>
      {children}
    </div>
  );
};
