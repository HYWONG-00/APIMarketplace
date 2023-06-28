import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { ID, Permission, Role } from 'appwrite'
import { client, apiProductID, databaseID, translationAPIDemoID, databases } from '../appwrite/config';
import { initiatePayment } from '../components/Payment';
import Stripe from 'stripe';

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

const Pricing = ({user, dispatch}) =>{
    const navigate = useNavigate()
    const accountPopover = usePopover();
    const [apiProduct, setApiProduct] = useState([])
    const [plans, setPlans] = useState([])

    const stripe = new Stripe('sk_test_51MKNU3Iec9R0jrCZKtlxK8no9NdDYvkZjAqggKjvZOEWw6tvrSuvAsgcEvYWnRIFxfFTTucjYu7h2rqNZiwBbUSN00tVXOZv11');

    useEffect(() => {
        const getApiProduct = databases.getDocument(databaseID, apiProductID, translationAPIDemoID)
        
        getApiProduct.then(
            function (response) {
                setApiProduct(response)
                setPlans(response.subscriptionPlans.map(plan => JSON.parse(plan)))
            },
            function (error) {
                console.log("Failed to retrieve subscriptions");
                console.log(error);
            }
        )
    }, []);

    async function checkout(name, desc, price, plan, planid, request) {
        await initiatePayment(name, desc, price, plan, planid, request)
    }

    return (
        <React.Fragment>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
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
                            Home
                        </Link>
                        <Link
                            
                            variant="button"
                            color="text.primary"
                            href="#"
                            sx={{ my: 1, mx: 1.5 }}
                        >
                            Pricing
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
            {/* Hero unit */}
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    {apiProduct.name}
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    {apiProduct.description}
                </Typography>
            </Container>
            {/* End hero unit */}
            <Container maxWidth="md" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {plans.map((plan) => (
                        // Enterprise card is full width at sm breakpoint
                        <Grid
                            item
                            key={plan.name}
                            xs={12}
                            sm={plan.name === 'Enterprise' ? 12 : 6}
                            md={3}
                        >
                            <Card>
                                <CardHeader
                                    title={plan.name}
                                    //   subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                        }}
                                    >
                                        {
                                            plan.type === 1 ? (
                                                <Typography component="h2" variant="h3" color="text.primary">
                                            ${plan.price}
                                        </Typography>
                                            ) :
                                            <Typography component="h2" variant="h3" color="text.primary">
                                            Volume
                                        </Typography>
                                        }
                                        {
                                            plan.type === 1 ? (
                                                <Typography variant="h6" color="text.secondary">
                                                /mo
                                            </Typography>
                                            ) :
                                            <div></div>
                                        }
                                        
                                    </Box>
                                    {
                                        plan.type === 1 ? (
                                            <ul>
                                            {plan.request} Request / Monthly
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                            >
                                            </Typography>
                                        </ul>
                                        ) : 
                                        <div></div>
                                    }
                                   
                                </CardContent>
                                <CardActions>
                                    {
                                        plan.type === 1 ? (
                                            <Button onClick
                                                ={() =>
                                                    checkout(apiProduct.name, apiProduct.description, plan.price, plan.name, apiProduct.$id, plan.request)
                                                }
                                                fullWidth variant='contained'>
                                                Subscribe
                                            </Button>
                                        ) : (
                                            <Button fullWidth variant='contained'>
                                                Contact Us
                                            </Button>
                                        )
                                    }

                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </React.Fragment>
    );
}
export default Pricing;