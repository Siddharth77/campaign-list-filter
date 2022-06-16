import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { useEffect, useState } from 'react';
import { ICampaignTable } from '../models/campaigntable.model';
import moment from 'moment';
import { getCampaigns } from '../store/actions/campaigntable.action';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { compareStartDateWithEndDate } from '../utils';

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
      maxWidth: '40%'
    },
    noData: {
      color: 'red',
      fontWeight: 500
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
    backgroundColor: 'steelblue',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    backgroundColor: 'white',
    fontWeight: 500
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    }
  }
}))(TableRow);

export const CampaignTable = () => {
  const classes = useStyles();
  let isInRange = false;

  const campaignData = useAppSelector((state) => state.campaigns.finalCampaignData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCampaigns());
  }, []);
  
  /**
   * For formatting the table date of Budget column
   * @param num 
   * @returns 
   */
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

  /**
   * For setting icons for active and inactive status
   * @param startDate 
   * @param endDate 
   * @returns 
   */
  const rangeComparer = (startDate: string, endDate: string): boolean => {
      let compareDate = moment();    
      let givenStartDate   = moment(startDate, 'MM/DD/YYYY');   
      let givenEndDate     = moment(endDate, 'MM/DD/YYYY');     
      return isInRange = compareDate.isBetween(givenStartDate, givenEndDate);
  }

  return (
    <div className={classes.tableFilterContainer}>
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
              {
                campaignData && 
                campaignData.length === 0 && (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      <div className={classes.noData}>NO DATA FOUND</div>
                    </StyledTableCell>
                  </StyledTableRow>
                )
              }
              { campaignData && 
                campaignData.length > 0 &&
                campaignData.map((row: ICampaignTable) => (
                  compareStartDateWithEndDate(row.startDate, row.endDate) &&
                  (<StyledTableRow key={row.id}>
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
                  </StyledTableRow>)
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