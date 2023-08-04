import React, { forwardRef } from 'react';
import { StyledButton } from './StyledButton';
import { CircularProgress, SxProps } from '@mui/material';

export interface IButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  component?: React.ElementType;
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  testId?: string;
  sx?: SxProps;
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
  const {
    variant = 'primary',
    disabled = false,
    size = 'lg',
    loading = false,
    fullWidth = false,
    children,
    component = 'button',
    testId = 'button',
    sx,
    ...rest
  } = props;

  return (
    <StyledButton
      className={`${variant} ${size} ${loading} ${disabled}`}
      // variant={variant}
      // component={component}
      disabled={disabled}
      {...rest}
      ref={ref}
      data-testid={testId}
      sx={{
        height: (size === 'sm' && '30px') || (size === 'md' && '40px') || '50px',
        fontSize: (size === 'sm' && '12px') || (size === 'md' && '14px') || '16px',
        padding: (size === 'sm' && '10px 16px') || (size === 'md' && '11px 20px') || '12px 24px',
        opacity: ((loading || disabled) && 0.5) || 1,
        ...(loading ? { pointerEvents: 'none' } : {}),
        ...sx,
      }}
    >
      {loading ? <CircularProgress size={20} color="success" /> : children}
    </StyledButton>
  );
});

Button.displayName = 'Button';
