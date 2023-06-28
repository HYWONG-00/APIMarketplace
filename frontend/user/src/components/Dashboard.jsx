import React, { useState, useCallback, useRef  } from 'react';
import Home from '../components/Components/Home';


//@mui/materialsetMethods
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button   from "@mui/material/Button";
import TextField from '@mui/material/TextField';

import { databases } from '../appwrite/config';
import {v4 as uuidv4} from 'uuid';

function Dashboard(props) {

  const [form, setForm] = useState({
    name: '',
    email: '',  
    enquiry: "",
  });
  const nameRef = useRef();
  const emailRef = useRef();
  const enquiryRef = useRef();

  const handleChangeForm = useCallback(
    (event) => {
        setForm((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
        }));
    },
    []
);

const handleSubmitEnquiry = (e) => {
    e.preventDefault();
    
    const promise = databases.createDocument('640c67da3e770e564c4b', "642e9679536a432fe673", uuidv4(), {
        name: form.name,
        email: form.email,
        enquiry: form.enquiry,
      });
      promise.then(
        function(response){
            alert("Enquiry sent!");

            //update all the code
            nameRef.current.value = '';
            emailRef.current.value = '';
            enquiryRef.current.value = '';
        },
        function(error){
            console.log(error);
        }
    );

    
  }

  return (
    /*
    <>
<Box
    component="section"
    sx={{ display: 'flex', overflow: 'hidden', backgroundImage:'url("https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")' }}
>
    <Container
    sx={{
        mt: 10,
        mb: 15,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}
    >
    <Typography variant="h4" sx={{ mb: 14, fontWeight: 700}}>
        COSMOS API
    </Typography>
    <div>
        <Grid container>
        <Grid item xs={12} align="center">
            <Typography 
            variant="h4"
            >
            Automate What Should Be Automated
            </Typography>
            <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <Button
                color="secondary"
                size="large"
                variant="contained"
                component="a"
                sx={{ mt: 8 }}
            >
                Get started
            </Button>
        </Grid>
        </Grid>
    </div>
    </Container>
</Box>


<Box
    component="section"
    sx={{ display: 'flex', overflow: 'hidden', backgroundColor: "white" }}
>
    <Container
    sx={{
        mt: 10,
        mb: 15,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }}
    >
        
          
    <form onSubmit={handleSubmitEnquiry}>
    <Grid container sx={{justifyContent: 'center'}}>
    <Grid item xs={12} sx={{textAlign: 'center'}}>
    <Typography variant="h4"  sx={{ mb: 14, fontWeight: 700}}>
        Contact Us
    </Typography>
    </Grid>
    <Grid item xs={12} md={8} sx={{textAlign: 'center'}}>
    <Box>
        <Typography variant="body2" color="text" mb={3}>
        For further questions, please email hello@example.com or make an enquiry with us.   
        We will get back to you as soon as possible.      
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
            <TextField
                variant="standard"
                label="Full Name"
                name="name"
                onChange={handleChangeForm}
                InputLabelProps={{ shrink: true }}
                fullWidth
                inputRef={nameRef}
            />
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
                type="email"
                variant="standard"
                label="Email"
                name="email"
                onChange={handleChangeForm}
                InputLabelProps={{ shrink: true }}
                fullWidth
                inputRef={emailRef}
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                variant="standard"
                label="What can we help you?"
                name="enquiry"
                onChange={handleChangeForm}
                placeholder="Describe your problem in at least 250 characters"
                InputLabelProps={{ shrink: true }}
                multiline
                fullWidth
                rows={6}
                inputRef={enquiryRef}
            />
            </Grid>
            <Grid item xs={12}>
            <Button
            color="secondary"
            size="large"
            variant="contained"
            type="submit"
            sx={{ mt: 8 }}
        >
            Submit
        </Button>
            </Grid>
        </Grid>
    </Box>

    </Grid>     
    </Grid>
    </form>
    </Container>
</Box>

    </>
*/

<div className="App">
<Home />

</div>
  );
}

export default Dashboard;