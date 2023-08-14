import React from 'react';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import { FaRegUserCircle } from 'react-icons/fa';
import { AppBar, Box, Container, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { ButtonBase as Button, IconButton, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { logout } from '@/utils/logout';
import { LinkText } from './constants';
import { GreenlyLogo } from '@/uiCore/components/GreenlyLogo';
import { useMe } from '@/modules/hooks/useMe/useMe';
import { MENU_ITEMS } from '@/uiCore/components/CategoryBar/constants';
import { useRouter } from 'next/router';
import { StyledNavBar } from './StyledNavBar';
import { theme } from '@/styles/theme';

export interface INavbarProps {
  variant?: 'primary' | 'secondary';
}

export const NavBar = () => {
  const router = useRouter();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const { me } = useMe();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [term, setTerm] = React.useState(router.query.term || '');
  const handleTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const DropMenu = () => {
    return (
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <Link href={'/user'} style={{ color: theme.palette.green.primary }}>
            {LinkText.profileLinkText}
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href={'/help'} style={{ color: theme.palette.green.primary }}>
            {LinkText.helpLinkText}
          </Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            logout();
            setAnchorEl(null);
          }}
          sx={{ color: theme.palette.green.primary }}
        >
          {LinkText.logoutLinkText}
        </MenuItem>
      </Menu>
    );
  };

  const handleSearch = () => {
    router.push(`/search?term=${term}`);
  };

  return (
    <AppBar position="static" color="inherit">
      <Container maxWidth="xl">
        <StyledNavBar>
          <Toolbar className={'noPadding'}>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {MENU_ITEMS.map(item => (
                  <MenuItem key={item.label} onClick={handleCloseNavMenu}>
                    <Typography variant="h6">
                      <Link className={'menuLink'} href={item.link} style={{ color: '#000000de' }}>
                        {item.label}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
                <MenuItem onClick={handleClose} className={'dropdownItem'}>
                  <Link className={'menuLink'} href={'/user'} style={{ color: theme.palette.green.primary }}>
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose} className={'dropdownItem'}>
                  <Link className={'menuLink'} href={'/help'} style={{ color: theme.palette.green.primary }}>
                    Help
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => logout()}
                  className={'dropdownItem'}
                  style={{ color: theme.palette.green.primary }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
            <Link href="/">
              <GreenlyLogo />
            </Link>

            <Typography variant="body2" className={'navbarText'}>
              Front page of the green revolution.
            </Typography>

            <Box className={'rightContainer'}>
              {router.pathname !== '/submit' && (
                <Link href={me?.id ? '/submit' : '/auth'} className={'submitButtonLink'}>
                  <Typography variant="body2" fontSize="20px" className={'submitButtonText'}>
                    Submit
                  </Typography>
                </Link>
              )}

              <Button type="submit" aria-controls="simple-menu" aria-haspopup="true" className={'submitButton'}>
                <FiSearch size={30} className={'navbarIcon'} />
              </Button>
              <TextField
                label="Search"
                id="outlined-size-small"
                value={term}
                onChange={handleTermChange}
                onKeyDown={e => {
                  if (e.code === 'Enter' || e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                onBlur={handleSearch}
                InputProps={{
                  endAdornment: <FiSearch size={30} className={'mobileVisible'} />,
                }}
                variant="outlined"
                size="small"
                sx={{
                  '& .MuiOutlinedInput-root': { fontSize: '1rem', pr: '10px', color: theme.palette.gray.primary },
                  '& .MuiFormLabel-root': { fontSize: '1rem' },
                }}
              />
              <Box sx={{ display: { xs: 'none', md: 'block' } }} width={62}>
                {me ? (
                  <>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                      <FaRegUserCircle size={30} className={'navbarIcon'} />
                    </Button>
                    <DropMenu />
                  </>
                ) : (
                  <Typography variant="h6" className={'loginText'}>
                    <Link href={'/auth'} style={{ color: theme.palette.gray.primary }}>
                      Login
                    </Link>
                  </Typography>
                )}
              </Box>
            </Box>
          </Toolbar>
        </StyledNavBar>
      </Container>
    </AppBar>
  );
};
