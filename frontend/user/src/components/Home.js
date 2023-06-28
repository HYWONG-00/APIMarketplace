import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import React from 'react'

import { AccountPopover } from './account-popover';
import { usePopover } from '../hooks/use-popover';
import { useNavigate } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';


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

const Home = ({user, dispatch}) => {
    const accountPopover = usePopover();
    const navigate = useNavigate();
    console.log(user)
    return (
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
                    <RouterLink
                        
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Home
                    </RouterLink>
                    <RouterLink
                    to='/pricing'
                       
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Pricing
                    </RouterLink>
                    <RouterLink
                        variant="button"
                        color="text.primary"
                        href="#"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        Support
                    </RouterLink>
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
    );

}

export default Home;

