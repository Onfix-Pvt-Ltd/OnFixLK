import React from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'text';
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  target?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon,
  iconPosition = 'right',
  href,
  target,
}) => {
  const buttonClass = `btn btn-${variant} ${className} ${disabled ? 'btn-disabled' : ''}`;

  const renderContent = () => (
    <>
      {icon && iconPosition === 'left' && <span className="btn-icon btn-icon-left">{icon}</span>}
      <span className="btn-label">{children}</span>
      {icon && iconPosition === 'right' && <span className="btn-icon btn-icon-right">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick as any}
        className={buttonClass}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
    >
      {renderContent()}
    </button>
  );
};
