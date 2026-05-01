import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-bold tracking-widest uppercase transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-1";

  const variants = {
    primary:
      "bg-slate-900 text-white hover:bg-slate-800 border-2 border-slate-900",
    secondary:
      "bg-blue-900 text-white hover:bg-blue-800 border-2 border-blue-900",
    outline:
      "bg-transparent border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white",
    danger: "bg-red-700 text-white hover:bg-red-800 border-2 border-red-700",
    ghost:
      "bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100",
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-8 py-3 text-xs",
    lg: "px-10 py-4 text-sm",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="mr-3 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : null}
      {children}
    </button>
  );
};

export default Button;
