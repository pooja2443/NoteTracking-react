import React from 'react';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'secondary' | 'icon';
  disabled?: boolean;
  className?: string;
  title?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'primary',
  disabled = false,
  className = '',
  title
}) => {
  return (
    <button
      className={`button ${type} ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};

export default Button;