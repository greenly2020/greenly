import React, { forwardRef, ReactNode, ReactElement } from 'react';
import { Tab as MUITab, TabProps } from '@mui/material';
import { theme } from '@/styles/theme';
import { styled } from '@mui/system';

export interface ITabProps {
  disabled?: boolean;
  value?: TabProps['value'];
  label?: ReactNode;
  icon?: ReactElement;
  selected?: boolean;
  onChange?: TabProps['onChange'];
  onClick?: TabProps['onClick'];
}

export const StyledTab = styled(MUITab)(() => ({
  color: theme.palette.gray.primary,
  '&:hover': { backgroundColor: theme.palette.gray.secondary },
  '&.Mui-selected': {
    color: theme.palette.gray.primary,
    backgroundColor: theme.palette.gray.secondary, // You can adjust the background color for the selected tab
  },
}));

export const Tab = forwardRef<HTMLDivElement, ITabProps>((props, ref) => {
  const { disabled, value, label, icon, selected, onChange, onClick, ...rest } = props;

  return (
    <StyledTab
      {...rest}
      ref={ref}
      tabIndex={0}
      disabled={disabled}
      label={label}
      icon={icon}
      value={value}
      // selected={selected}
      onChange={onChange}
      onClick={onClick}
    />
  );
});

Tab.displayName = 'Tab';
