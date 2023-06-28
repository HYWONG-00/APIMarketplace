import React, { useState, useEffect, useCallback } from 'react';
import { databaseID, databases, subscriptionsID } from '../appwrite/config';

//@mui/material
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormGroup   from "@mui/material/FormGroup";
import Button   from "@mui/material/Button";
import ButtonGroup   from "@mui/material/ButtonGroup";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import api from '../appwrite/api'
import { Server } from '../appwrite/config';
import { Query } from 'appwrite';


const Subscription = ({user, dispatch}) => {
  const [loader, setLoader] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    setLoader(true);

    async function getSubscriptions() {
      const subscriptions = await api.listDocuments(Server.databaseID, Server.subscriptionID, [
        Query.equal('uid', user['$id'])]);
        setSubscriptions(subscriptions['documents'])
    }

    getSubscriptions()
    setLoader(false);
  }, []);
  
  const handleUpgradePlan = (event, id) => {
    console.log("UpgradePlan for: " + id);
  };

  const handleCancelPlan = (event, id) => {
    console.log("CancelPlan for: " + id);
  };

  return (
    <>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                xs={12}
                sx={{textAlign: "center", mb: 3}}
              >
                <Typography variant="h4">
                Subscriptions
                </Typography>
              </Grid>
               {loader ? (
                    <p>Loading ...</p>
                ) : (
                (subscriptions.length > 0) ? (
                subscriptions.map((s) => (                   
                    <Grid item xs={12}
                    >
                    <Card sx={{ p: 2 }}>
                    <CardContent>
                        <Grid container spacing={5}>
                            <Grid item xs={12} md={4}>
                                <Typography variant="h6">{s.name} <ChevronRightIcon style={{verticalAlign:"middle"}}/></Typography>
                                
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Typography variant="body1">{s.plan}</Typography>
                                <LinearProgress variant="determinate" value={s.usedRequest / s.totalRequest * 100}/>
                                <Typography variant="body2">Used {(s.usedRequest / s.totalRequest * 100).toFixed(2)} % monthly limit. </Typography>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                
                                <ButtonGroup  aria-label="outlined button group">
                                <Button variant="contained" color="success" type="button" onClick={handleUpgradePlan(s.$id)}>Upgrade</Button>
                                <Button variant="outlined" color="error" type="button" onClick={handleCancelPlan(s.$id)}>Cancel</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </CardContent>
                    </Card>
                    <Divider />
                    </Grid>
                ))
                ) : (
                    <Grid
                        item
                        xs={12}
                        sx={{textAlign: "center", mb: 3}}
                    >
                    <Typography variant="h6">You don't have any subscription yet. View <a href="" sx={{ color: 'primary.main' }}>APICatalog</a> for more.</Typography>
                    </Grid>
                )
                
            )}
            </Grid>
      </Container>
    </Box>

    </>
  );
}

export default Subscription;
