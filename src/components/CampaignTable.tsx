import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import mockCampaignData from '../mock-data/MockCampaignData.json';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from "material-ui-search-bar";
import { CircularProgress } from '@material-ui/core';
import { ICampaignTable, IUserData } from '../Models/CampaignTable';
import moment from 'moment';

const useStyles = makeStyles({
    table: {
      position: 'relative',
      minWidth: 700,
    },
    tableFilterContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    searchContainer: {
      display: 'flex',
      placeContent: 'end',
      maxWidth: '40%',
      position: 'absolute',
      top: '20px',
      right: '20px'
    },
    noData: {
      color: 'red'
    },
    loader: {
      position: 'fixed',
      margin: '0 auto',
      left: 0,
      right: 0
    }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    backgroundColor: theme.palette.common.white
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    }
  }
}))(TableRow);

const CampaignTable = () => {
  const classes = useStyles();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [campaignTableData, setCampaignTableData] = useState<ICampaignTable[]>(mockCampaignData);
  const [search, setSearch] = useState<string>('');
  const [finalData, setFinalData] = useState<ICampaignTable[]>([]);
  let updatedData: ICampaignTable[] = finalData;
  let isInRange = false;
  
  useEffect(() => {
    setLoading(true);
    getUserData();
  }, [updatedData]);

  const getUserData = async () => {
    await axios
      .get(`https://jsonplaceholder.typicode.com/users`)  
      .then((response: {data: SetStateAction<never[]>}) => {
        dataRenderTable(campaignTableData);
        setUserData(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err)) 
  }

  const dataRenderTable = (data: ICampaignTable[]) => {
    for(let i=0; i<data.length; i++ ) {
      let filteredUserObj = filterUserById(data[i])
      data[i].userId = filteredUserObj.userId;
      data[i].username = filteredUserObj.username;
    }
    setFinalData(data);
  }

  const cancelSearch = () => {
    setSearch('');
    requestSearch(search);
  };

  const requestSearch = (searchedVal: string) => {
    if(searchedVal === '') {
        updatedData = finalData;
    } else {
        updatedData = finalData.filter((row) => {
          return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });
    }
    // setFinalData(updatedData);
  };

  const filterUserById = (data: ICampaignTable) => {
    let obj: any = {
      "username": data.username || 'Unknown User',
      "userId": data.userId
    };
    let filteredUser: IUserData[] = userData.filter((user: IUserData) => data.userId === user.id);
    if(filteredUser.length) {
      obj.username = filteredUser[0].name;
    };
    return obj;
  }

  const numberFormatter = (num: number) => {
    let unitlist = ["","K","M","G"];
    let sign = Math.sign(num);
    let unit = 0;
    
    while(Math.abs(num) > 1000)
    {
      unit = unit + 1; 
      num = Math.floor(Math.abs(num) / 100)/10;
    }
    return sign*Math.abs(num) + unitlist[unit];
  }

  const rangeComparer = (startDate: string, endDate: string): boolean => {
      let compareDate = moment();    
      let givenStartDate   = moment(startDate, 'MM/DD/YYYY');   
      let givenEndDate     = moment(endDate, 'MM/DD/YYYY');     
      return isInRange = compareDate.isBetween(givenStartDate, givenEndDate);
  }

  return (
    <div className={classes.tableFilterContainer}>
      <SearchBar
        value={search}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
        placeholder="Search by name"
        className={classes.searchContainer}/>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="campaign-table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">User&nbsp;Name</StyledTableCell>
              <StyledTableCell align="center">Start&nbsp;Date</StyledTableCell>
              <StyledTableCell align="center">End&nbsp;Date</StyledTableCell>
              <StyledTableCell align="center">Active</StyledTableCell>
              <StyledTableCell align="center">Budget</StyledTableCell>
            </TableRow>
          </TableHead>
          { <TableBody>
              { loading ? 
                <StyledTableRow>
                  <StyledTableCell component="th" scope="row">
                    <CircularProgress className={classes.loader}/>
                  </StyledTableCell>                  
                </StyledTableRow>
                :
                updatedData.map((row: ICampaignTable) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {row.username}
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.startDate}</StyledTableCell>
                    <StyledTableCell align="center">{row.endDate}</StyledTableCell>
                    <StyledTableCell align="center"> { rangeComparer(row.startDate, row.endDate) ?
                      <>
                          <CheckCircleIcon style={{ color: 'green' }}/>
                      </> :
                      <>
                          <CancelIcon style={{ color: 'red'}}/>
                      </>}
                      </StyledTableCell>
                    <StyledTableCell align="center">
                      {`${numberFormatter(row.Budget)} USD`}
                    </StyledTableCell>
                  </StyledTableRow>
                ))               
              }
            </TableBody>
          }
        </Table>
      </TableContainer>
    </div>
  );
}

export default CampaignTable;