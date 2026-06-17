import React from 'react';

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
  const baseClass = `inline-flex items-center justify-center px-7 py-3 text-[0.95rem] font-semibold rounded-pill border border-transparent cursor-pointer whitespace-nowrap select-none transition-all duration-150 ease-out outline-none focus-visible:ring-3 focus-visible:ring-accent/40`;

  const variantClasses = {
    primary: `relative overflow-hidden bg-white/12 backdrop-blur-[14px] text-[#1a1a1a] border border-white/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_2px_16px_rgba(255,94,0,0.10),0_1px_4px_rgba(0,0,0,0.08)] before:content-[''] before:absolute before:inset-0 before:bg-linear-[110deg,transparent_30%,rgba(255,255,255,0.35)_50%,transparent_70%] before:-translate-x-full hover:before:translate-x-full before:transition-transform before:duration-550 before:ease-out hover:bg-white/20 hover:border-accent/50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.80),0_0_18px_rgba(255,94,0,0.18),0_4px_20px_rgba(0,0,0,0.10)] hover:-translate-y-0.5 active:translate-y-0`,
    secondary: `bg-white/8 backdrop-blur-[10px] text-[#1a1a1a] border border-black/14 shadow-[inset_0_1px_0_rgba(255,255,255,0.60),0_1px_4px_rgba(0,0,0,0.06)] hover:bg-white/18 hover:border-accent/35 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_0_14px_rgba(255,94,0,0.12),0_4px_16px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 active:translate-y-0`,
    accent: `bg-accent text-white shadow-glow hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-glow-strong active:translate-y-0`,
    text: `bg-transparent text-[#1a1a1a] px-4 py-2 hover:text-accent hover:translate-x-[3px]`,
  };

  const buttonClass = `${baseClass} ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`;

  const renderContent = () => (
    <>
      {icon && iconPosition === 'left' && <span className="inline-flex items-center text-inherit mr-2">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {icon && iconPosition === 'right' && <span className="inline-flex items-center text-inherit ml-2">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
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
