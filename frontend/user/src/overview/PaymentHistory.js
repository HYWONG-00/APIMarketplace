
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState, useEffect, useCallback } from 'react';
import api from '../appwrite/api';
import { Server } from '../appwrite/config';
import { Query } from 'appwrite';

function createData(date, api, plan, cost) {
    return { date, api, plan, cost };
}



const PaymentHistory = ({ user }) => {
    const [loader, setLoader] = useState(false);

    const [rows, setRows] = useState([]);

    useEffect(() => {
        setLoader(true);

        async function getHistories() {
            const history = await api.listDocuments(Server.databaseID, Server.paymentHistoryID, [
                Query.equal('uid', user['$id'])]);



            const histories = history['documents']
            console.log(histories[0]['datetime'])
            const newRows = histories.map((history) => [
                history['date'],
                history['api'],
                'starter',
                history['amount'],
            ]);
            setRows(newRows)
            setLoader(false);

            console.log(newRows)
        }



        getHistories();




    }, []);


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
                    <Typography variant="h3" sx={{ mb: 3, textAlign: "center" }}>Payment History</Typography>

                    {loader ? (
                        <CircularProgress sx={{ my: 3 }} />
                    ) : (
                        <Box>

                            {(rows == []) ? (
                                <Card
                                    sx={{
                                        p: 3,
                                        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                                    }}>
                                    <Typography variant="h6">You don't have any subscription yet. View <a href="" sx={{ color: 'primary.main' }}>APICatalog</a> for more.</Typography>
                                </Card>
                            ) : (
                                <Grid>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Date</TableCell>
                                                    <TableCell >API</TableCell>
                                                    <TableCell >Plan</TableCell>
                                                    <TableCell >Cost</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow
                                                        key={row.name}
                                                    >
                                                        <TableCell >{row[0]}</TableCell>
                                                        <TableCell>{row[1]}</TableCell>
                                                        <TableCell>{row[2]}</TableCell>
                                                        <TableCell >{row[3]}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            )}
                        </Box>
                    )}
                </Container>
            </Box>
        </>

    );
}

export default PaymentHistory;