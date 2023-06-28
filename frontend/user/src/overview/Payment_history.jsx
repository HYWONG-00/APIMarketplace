import React, { useState, useEffect } from 'react'
import { databaseID, databases, paymentHistoryID } from '../appwrite/config'
import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';

//@mui/material
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';


import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import api from '../appwrite/api';
import { Server } from '../appwrite/config';
import { Query } from 'appwrite';

//function for table
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
//function for table
const headCells = [
  {
    id: 'datetime',
    disablePadding: false,
    label: 'Date & Time',
    
  },
  {
    id: 'api',
    disablePadding: false,
    label: 'API',
  },
  {
    id: 'amount',
    disablePadding: false,
    label: 'Amount (RM)',
  },
  {
    id: 'method',
    disablePadding: false,
    label: 'Payment Method',
  },
];

function EnhancedTableHead(props) {

  const {  numSelected, order, orderBy, onSelectAllClick, onRequestSort , rowCount} = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead style={{
      backgroundColor: "white",
      }}>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, onDeleteBtnClick } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="payment-history-title"
          component="div"
        >
          Payment_History
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDeleteBtnClick} >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDeleteBtnClick: PropTypes.func.isRequired,
};


function EnhancedTable(props) {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('age');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    // Fetch data from an API endpoint
    setRows(props.histories);
    console.log(JSON.stringify(props.histories));
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.$id);
      setSelected(newSelected);
      
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleDeleteBtnClick = (event) => {

    let newData = rows;
    // for (let i = 0; i < selected.length; i++) {
    //   //const promise = databases.deleteDocument(databaseID, paymentHistoryID, selected[i]);

    //   // promise.then(function (response) {
    //   //     console.log(response); // Success

    //   //     newData = rows.filter(row => row.$id !== selected[i]);

    //   //     //reload the table
    //   //     setRows(
    //   //       [
    //   //         {"amount":12.21,"method":"Stripe","api":"Translation API","$id":"6426fee2ceb1dc221460","$createdAt":"2023-03-31T15:40:18.846+00:00","$updatedAt":"2023-03-31T15:40:18.846+00:00","$permissions":[],"$collectionId":"6426fcff66959a63a017","$databaseId":"640c67da3e770e564c4b"},
    //   //         {"amount":12.12,"method":"Stripe","api":"Translation API","$id":"6426fefcb2dd11ba3c91","$createdAt":"2023-03-31T15:40:44.732+00:00","$updatedAt":"2023-03-31T15:40:44.732+00:00","$permissions":[],"$collectionId":"6426fcff66959a63a017","$databaseId":"640c67da3e770e564c4b"},
    //   //         {"amount":13.13,"method":"Stripe","api":"Translation API","$id":"6426ff0d3982c7b257cf","$createdAt":"2023-03-31T15:41:01.235+00:00","$updatedAt":"2023-03-31T15:41:01.235+00:00","$permissions":[],"$collectionId":"6426fcff66959a63a017","$databaseId":"640c67da3e770e564c4b"},
    //   //         // {"amount":14.14,"method":"Stripe","api":"Translation API","$id":"6426ff1b3fb0fc52c8be","$createdAt":"2023-03-31T15:41:15.261+00:00","$updatedAt":"2023-03-31T15:41:15.261+00:00","$permissions":[],"$collectionId":"6426fcff66959a63a017","$databaseId":"640c67da3e770e564c4b"},
    //   //         {"amount":15.15,"method":"Stripe","api":"Translation API","$id":"6426ff2cbf3265b34571","$createdAt":"2023-03-31T15:41:32.783+00:00","$updatedAt":"2023-03-31T15:41:32.783+00:00","$permissions":[],"$collectionId":"6426fcff66959a63a017","$databaseId":"640c67da3e770e564c4b"}
    //   //       ]
    //   //     );
    //   //     console.log("damnnn");
    //   // }, function (error) {
    //   //     console.log(error); // Failure
    //   // }); 
    // } 
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  
  
    

  return (
    <Box sx={{ width: '100%', boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
      <Paper sx={{ width: '100%'}}>
        <EnhancedTableToolbar numSelected={selected.length} onDeleteBtnClick={handleDeleteBtnClick}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="payment-history-title"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              //rowCount={rows.length}      
            />
            <TableBody>
              
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.$id);
                  const labelId = `payment-history-checkbox-${index}`;
                  console.log(index + row);
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.$id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.$id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none">
                      {new Date(row.datetime).toLocaleDateString() + " " +  new Date(row.datetime).toLocaleTimeString()}
                      </TableCell>
                      <TableCell
                      >{row.api}
                      </TableCell>
                      <TableCell
                      >{row.amount}
                      </TableCell>
                      <TableCell
                      >{row.method}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}


const PaymentHistory = ({user, dispatch}) => { 
  const navigate = useNavigate()
  
  // Define the initial state of the component
  const [histories, setHistories] = useState([]);
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
    

    async function getHistories() {
      const histories = await api.listDocuments(Server.databaseID, Server.paymentHistoryID, [
        Query.equal('uid', user['$id'])]);
        setHistories(histories['documetns'])
    }
    console.log(histories)

    getHistories();
    setLoader(false)
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
      <Typography variant="h3" sx={{ mb: 3, textAlign: "center"}}>Payment History</Typography>

      {loader ? (
        <CircularProgress sx={{my: 3}}/>
      ) : (
        <Box>       
          
          { (histories == []) ? (
            <Card 
            sx = {{
              p: 3,
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}>
              <Typography variant="h6">You don't have any subscription yet. View <a href="" sx={{ color: 'primary.main' }}>APICatalog</a> for more.</Typography>
            </Card>
            ) : (
            <Grid>
              <EnhancedTable histories={histories} />
            </Grid>
            )}          
        </Box>
      )}
      </Container>
      </Box>  
    </>
  )
}

export default PaymentHistory;