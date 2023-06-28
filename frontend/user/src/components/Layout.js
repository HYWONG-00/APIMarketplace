

import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import React, { useState, useEffect } from 'react';

import { AccountPopover } from './account-popover';
import { usePopover } from '../hooks/use-popover';


function stringAvatar(name) {
    return {
      sx: {
        backgroundColor: '#734AE6',
        height: 40,
        width: 40,
        cursor: 'pointer',
        textTransform: "capitalize",
        my: 2,
      },
      children: `${name.split(' ')[0][0]}`,//${name.split(' ')[1][0]}
    };
  }

// const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  //   [theme.breakpoints.up('lg')]: {
  //     paddingLeft: SIDE_NAV_WIDTH
  //   }
}));

const Layout = ({user, dispatch}) => {
  const accountPopover = usePopover();
  console.log(user)
  return (
    <>
      <header>
        <AppBar
            position="static"
            color="default"
            elevation={0}
            sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    Company name
                </Typography>
                <nav>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Features
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Enterprise
                    </Link>
                    <Link
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Support
                    </Link>
                </nav>
                <Avatar
                  onClick={accountPopover.handleOpen}
                  ref={accountPopover.anchorRef}
                  //src="../assets/avatar.png"
                  {...stringAvatar(user['name'])}
                />
            </Toolbar>
        </AppBar>
        <AccountPopover
         
          anchorEl={accountPopover.anchorRef.current}
          open={accountPopover.open}
          onClose={accountPopover.handleClose}
          avatarcolor="#FF5733"
          name={user['name']}
          email={user['email']}
          dispatch={dispatch}
        />
        </header>
      <main>
        {/* <SideNav
            onClose={() => setOpenNav(false)}
            open={openNav}
          /> */}
        <LayoutRoot>
          <div style={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%'
          }}>
            {/* {children} */}
            {/* <Container
                maxWidth="lg"
                sx={{ pt: 5 }}
                >
                   {children}  
                </Container> */}
          </div>
        </LayoutRoot>
      </main>
    </>
  );
};

export default Layout;
