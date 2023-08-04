import React, { forwardRef, useEffect, useState } from 'react';
import { AppBar, Box, Container, Typography, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { IMenuItem, MENU_ITEMS, ICategoryBarProps } from './constants';
import { StyledCategoryBarBox } from './StyledCategoryBar';
import { theme } from '@/styles/theme';

export const CategoryBar = forwardRef<HTMLElement, ICategoryBarProps>((props, _) => {
  const lgScreen = useMediaQuery(`(max-width:${theme.breakpoints.values.lg}px)`);
  const smScreen = useMediaQuery(`(max-width:${theme.breakpoints.values.sm}px)`);

  const [activeItem, setActiveItem] = useState<string>('');
  const location = useRouter();

  useEffect(() => {
    const currentMenuItem = MENU_ITEMS.find(item => item.link === location.pathname);
    if (currentMenuItem) {
      setActiveItem(currentMenuItem.label);
    }
  }, [location.pathname]);

  const handleMenuItemClick = (item: IMenuItem) => {
    setActiveItem(item.label);
  };

  return (
    <Box  
      color={theme.palette.gray.primary} 
      borderTop={`1px solid ${theme.palette.gray.background}`} 
      pt='1px' 
      display={smScreen ? 'none' : 'unset'}>
      <AppBar component="div" position="static" color="inherit" elevation={0}>
        <Container maxWidth='xl'>
            <StyledCategoryBarBox>
              <Box 
                display='flex' 
                alignItems='center' 
                flexGrow={1} 
                minWidth= {lgScreen ? 700 : 940} 
                height='100%'
                minHeight='41px'>

              {MENU_ITEMS.map(item => (
                <Typography
                  key={JSON.stringify(item)}
                  variant="h6"
                  fontWeight={activeItem === item.label || location.pathname === item.link ? 600 : 400}
                  flexGrow={1}
                  textAlign='center'
                  textTransform='uppercase'
                  mx={lgScreen ? '5px' :'12px'}
                  fontSize={lgScreen ? '16px' : 'unset'}
                  fontFamily={theme.typography.fontFamily}
                >
                  <Link
                    href={item.link}
                    onClick={() => handleMenuItemClick(item)}
                    style={{
                      color:
                        activeItem === item.label || location.pathname === item.link
                          ? theme.palette.green.primary
                          : theme.palette.gray.primary,
                    }}
                  >
                    {item.label}
                  </Link>
                </Typography>
              ))}
              </Box>
            </StyledCategoryBarBox>
        </Container>
      </AppBar>
    </Box>
  );
});

CategoryBar.displayName = 'CategoryBar';
