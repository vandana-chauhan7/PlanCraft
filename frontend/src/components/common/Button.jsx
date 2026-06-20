import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  type = 'button', 
  onClick, 
  className = '',
  disabled = false,
  fullWidth = false 
}) => {
  const baseStyle = "px-5 py-2.5 font-body font-medium transition-all duration-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-academia-leather focus:ring-offset-2 focus:ring-offset-academia-parchment flex items-center justify-center text-sm tracking-wide";
  
  const variants = {
    primary: "bg-academia-gold text-white hover:bg-[#b88f61] shadow-sm disabled:opacity-50 disabled:hover:bg-academia-gold",
    secondary: "bg-academia-paper text-academia-ink border border-academia-leather hover:bg-[#eaddce] shadow-sm disabled:opacity-50",
    ghost: "text-academia-inkLight hover:text-academia-ink hover:bg-academia-leather/20 disabled:opacity-50",
    danger: "bg-[#8c3b3b] text-white hover:bg-[#702f2f] shadow-sm border border-[#702f2f] disabled:opacity-50"
  };

  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className} ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
    >
      {children}
    </button>
  );
};

export default Button;