import React, { forwardRef } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type FillHoverButtonVariant = 'solid' | 'outline';

type FillHoverButtonBaseProps = {
  className?: string;
  children: React.ReactNode;
  variant?: FillHoverButtonVariant;
};

type FillHoverButtonAsButton = FillHoverButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
  };

type FillHoverButtonAsLink = FillHoverButtonBaseProps &
  Omit<LinkProps, 'className' | 'children'> & {
    to: string;
  };

export type FillHoverButtonProps = FillHoverButtonAsButton | FillHoverButtonAsLink;

const sharedStyles =
  'group relative overflow-hidden inline-flex items-center justify-center font-bold cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ea580c]/40 focus-visible:ring-offset-2';

const variantStyles: Record<FillHoverButtonVariant, string> = {
  solid: 'bg-[#222222] text-white',
  outline: 'bg-transparent border-2 border-[#ea580c] text-white',
};

function FillHoverOverlay() {
  return (
    <span
      className="absolute inset-0 bg-[#ea580c] pointer-events-none transition-none group-hover:transition-[clip-path] group-hover:duration-500 ease-out group-hover:[--btn-hover-size:150%]"
      style={{
        clipPath:
          'circle(var(--btn-hover-size, 0) at var(--btn-hover-x, 50%) var(--btn-hover-y, 50%))',
      }}
      aria-hidden
    />
  );
}

const FillHoverButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, FillHoverButtonProps>(
  function FillHoverButton({ className = '', children, variant = 'solid', ...props }, ref) {
    const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty('--btn-hover-x', `${event.clientX - rect.left}px`);
      event.currentTarget.style.setProperty('--btn-hover-y', `${event.clientY - rect.top}px`);
    };

    const combinedClassName = `${sharedStyles} ${variantStyles[variant]} ${className}`.trim();

    if ('to' in props && props.to) {
      const { to, ...linkProps } = props;
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          to={to}
          className={combinedClassName}
          onPointerMove={handlePointerMove}
          {...linkProps}
        >
          <FillHoverOverlay />
          <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
        </Link>
      );
    }

    const { ...buttonProps } = props as FillHoverButtonAsButton;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={combinedClassName}
        onPointerMove={handlePointerMove}
        {...buttonProps}
      >
        <FillHoverOverlay />
        <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
      </button>
    );
  }
);

export default FillHoverButton;
