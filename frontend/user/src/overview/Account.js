import React, { useState, useEffect, useCallback } from 'react';
import { accountID, databaseID, databases } from '../appwrite/config';
import api from '../appwrite/api'

//@mui/material
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import { Query } from 'appwrite';
import { Server } from '../appwrite/config';
import { AccountPopover } from '../components/account-popover';
import { usePopover } from '../hooks/use-popover';

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringBigAvatar(name) {
    return {
        sx: {
            backgroundColor: '#734AE6',
            height: 80,
            mb: 2,
            width: 80,
            textTransform: "capitalize"
        },
        children: `${name.split(' ')[0][0]}`,//${name.split(' ')[1][0]}
    };
}

function stringSmallAvatar(name) {
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

const Account = ({ user, dispatch }) => {
    const accountPopover = usePopover();
    console.log('new account')
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [apikey, setAPIKey] = useState(null);
    const [values, setValues] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);


    useEffect(() => {

        async function fetchData() {

            const loginAccount = await api.listDocuments(Server.databaseID, Server.accountID, [
                Query.equal('uid', user.$id)
            ]);
            const loginAccountID = loginAccount['documents']['0']['$id'];
            const value = await api.getDocument(Server.databaseID, Server.accountID, loginAccountID);



            setValues(value);
            setName(value.name);
            setEmail(value.email);
            setAPIKey(value.apikey);



        }

        fetchData();

    }, []);

    const handleChange = useCallback(
        (event) => {
            setValues((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );

    const handleSubmit = async (e) => {
        e.preventDefault();

        // alert(JSON.stringify(values));
        const loginAccount = await api.listDocuments(Server.databaseID, Server.accountID, [
            Query.equal('uid', user.$id)
        ]);
        const loginAccountID = loginAccount['documents']['0']['$id'];
        const promise = databases.updateDocument(databaseID, accountID, loginAccountID, {
            name: values.name,
            email: values.email,
            phone: values.phone,
        });
        promise.then(
            function (response) {
                alert("success");

                //update all the code
                setValues(response);
                setName(response.name);
                setEmail(response.email);
            },
            function (error) {
                console.log(error);
            }
        );
        //window.location.reload() // handle it in different way
        e.target.reset();
        //window.location.reload()
    }

    const [password, setPassword] = useState({
        oldpassword: '',
        newpassword: '',
        newpassword2: '',
    });

    const handleChangePassword = useCallback(
        (event) => {
            setPassword((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value
            }));
        },
        []
    );

    const validatePassword = (password) => {
        let validate = false;

        if (password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
            validate = true;
        }
        return validate;
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        const loginAccount = await api.listDocuments(Server.databaseID, Server.accountID, [
            Query.equal('uid', user.$id)
        ]);
        const loginAccountID = loginAccount['documents']['0']['$id'];

        if (password.oldpassword !== values.password) {
            alert('Passwords do not match');
        }
        else if (password.newpassword !== password.newpassword2) {
            alert('Re-enter new password');
        }
        else if (!validatePassword(password.newpassword)) {
            alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
        }
        else {
            const promise = databases.updateDocument(databaseID, accountID, loginAccountID, {
                password: password.newpassword,
            })

            promise.then(
                function (response) {
                    alert("Password update done.");

                    //the thing is you can only see the updated password after 1 seconds delay (as everything is asynchronous)
                    setValues(prevValues => ({ ...prevValues, password: response.password }));

                    //reset the form
                    setPassword(prevPass => ({ ...prevPass, oldpassword: "" }));
                    setPassword(prevPass => ({ ...prevPass, newpassword: "" }));
                    setPassword(prevPass => ({ ...prevPass, newpassword2: "" }));
                },
                function (error) {
                    console.log(error);
                }
            );

        }
    }

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
                            {...stringSmallAvatar(user['name'])}
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
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Typography variant="h3" sx={{ mb: 5, textAlign: "center" }}>
                        Account
                    </Typography>
                    {values ? (

                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                xs={12}
                                sx={{ textAlign: "center", mb: 3 }}
                            >

                            </Grid>


                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={4}
                            >
                                <Card>
                                    <CardContent>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            <Avatar
                                                {...stringBigAvatar(name ? name : "")}
                                            // Avatar styling will be set in function, so tht it won't have 2 sx={{}}
                                            />
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                            >
                                                {name}
                                            </Typography>
                                            <Typography
                                                color="text.primary"
                                                variant="body2"
                                                sx={{ fontWeight: 700 }}
                                            >
                                                {email}
                                            </Typography>
                                            <Typography
                                                color="text.secondary"
                                                variant="body2"
                                            >
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                    {/* <Divider />
        <CardActions>
          <Button
            fullWidth
            variant="text"
          >
            Upload picture
          </Button>
        </CardActions> */}
                                </Card>

                            </Grid>
                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={8}
                            >

                                <form
                                    autoComplete="off"
                                    noValidate
                                    onSubmit={handleSubmit}

                                >
                                    <Card sx={{ p: 2 }}>
                                        <CardHeader
                                            subheader="The information can be edited"
                                            title="Profile"
                                        />
                                        <CardContent sx={{ py: 3 }}>
                                            <Box>
                                                <Grid
                                                    container
                                                    spacing={3}
                                                >
                                                    <Grid
                                                        item
                                                        xs={12}
                                                    >
                                                        <TextField
                                                            fullWidth
                                                            label="Full Name"
                                                            name="name"
                                                            onChange={handleChange}
                                                            required
                                                            value={values.name}
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={6}
                                                    >
                                                        <TextField
                                                            fullWidth
                                                            label="Email Address"
                                                            name="email"
                                                            onChange={handleChange}
                                                            required
                                                            value={values.email}
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={6}
                                                    >
                                                        <TextField
                                                            fullWidth
                                                            label="Phone Number"
                                                            name="phone"
                                                            onChange={handleChange}
                                                            type="number"
                                                            value={values.phone}
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={6}
                                                    >

                                                    </Grid>
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={6}
                                                    >


                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </CardContent>
                                        <Divider />
                                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                                            <Button variant="contained" type="submit">
                                                Save details
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </form>
                                <Divider sx={{ my: 3 }} />

                                <Card sx={{ p: 2 }}>
                                    <CardHeader
                                        subheader="Use this API key for the request."
                                        title="API Key"
                                    />
                                    <CardContent sx={{ py: 3 }}>
                                        <TextField
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            value={apikey ? apikey : ""}
                                        />
                                    </CardContent>
                                </Card>

                                <Divider sx={{ my: 3 }} />

                                <form
                                    autoComplete="off"
                                    noValidate
                                    onSubmit={handleResetPassword}>
                                    <Card sx={{ p: 2 }}>
                                        <CardHeader
                                            title="Change Password"
                                        />
                                        <CardContent sx={{ py: 3 }}>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Old Password"
                                                        name="oldpassword"
                                                        onChange={handleChangePassword}
                                                        required
                                                        value={password.oldpassword}
                                                        type="password"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="New Password"
                                                        name="newpassword"
                                                        onChange={handleChangePassword}
                                                        required
                                                        value={password.newpassword}
                                                        type="password"
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Re-type New Password"
                                                        name="newpassword2"
                                                        onChange={handleChangePassword}
                                                        required
                                                        value={password.newpassword2}
                                                        type="password"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                        <Divider />
                                        <CardActions sx={{ justifyContent: 'flex-end' }}>
                                            <Button variant="contained" type="submit">
                                                Save Password
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </form>

                            </Grid>
                        </Grid>

                    ) : (
                        <Box
                            sx={{ textAlign: "center", my: 5 }}
                        >
                            <CircularProgress />
                        </Box>

                    )}
                </Container>
            </Box>

        </>
    );
}

export default Account;
