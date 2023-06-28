import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography, Stack, Avatar } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { account, accountRoute, paymentHistoryRoute, paymentMethodRoute, sessionID, subscriptionRoute } from '../appwrite/config'

import api from "../appwrite/api";
import { useGetUser } from "../hooks/index";
import { FetchState } from '../hooks/index';

export const AccountPopover = ({anchorEl, onClose, open, name, email, dispatch}) => {
  // const { anchorEl, onClose, open, name, email, avatarcolor} = props;
  const navigate = useNavigate()
  const handleSignOut = 
    async (e) => {
      dispatch({ type: FetchState.FETCH_INIT});
      try {
        // let user = await api.getAccount()
  
        await api.deleteCurrentSession();
        navigate('/')
        dispatch({ type: FetchState.FETCH_SUCCESS, payload: null });
      } catch (e) {
        console.log(e)
      }
    }
  const menuAccount = {
    color: "text.secondary",
  };
  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 250 } }}
    >
      <Box>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ p: 0.5 }}>
          <Avatar alt="profile user" sx={{
            backgroundColor: '#734AE6',
            height: 40,
            width: 40,
            cursor: 'pointer',
            textTransform: "capitalize",
            m: 2,
          }
          } />
          <Stack direction="column" alignItems="left" sx={{ p: 0.5 }}
          // spacing={2}
          >
            <Typography
              variant="subtitle1"
            >
              {name ? name : "NIL"}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {email ? email : "NIL"}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem component={RouterLink} to={'/subscriptions'} sx={menuAccount}>
          Subscription
        </MenuItem>
        <MenuItem component={RouterLink} to={'/paymentHistory'} sx={menuAccount} >
          Purchase history
        </MenuItem>
        <MenuItem component={RouterLink} to={'/account'} sx={menuAccount}>
          Account
        </MenuItem>
      </MenuList>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        <MenuItem component={RouterLink} to="/" sx={menuAccount}>
          Support
        </MenuItem>
        <MenuItem onClick={handleSignOut} to="/login" sx={menuAccount}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};
// AccountPopover.propTypes = {
//   anchorEl: PropTypes.any,
//   onClose: PropTypes.func,
//   open: PropTypes.bool.isRequired,
//   name: PropTypes.string,
//   email: PropTypes.string,
//   avatarcolor: PropTypes.string,
// };

