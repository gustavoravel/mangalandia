import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

const Button = forwardRef(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-dark',
      secondary: 'bg-secondary text-white hover:bg-secondary-dark',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm',
      md: 'h-11 px-8 text-base',
      lg: 'h-12 px-8 text-lg',
    };

    return (
      <button
        className={twMerge(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
export { Button };