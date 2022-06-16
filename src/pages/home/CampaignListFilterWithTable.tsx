import { makeStyles, Paper } from "@material-ui/core";
import CampaignTable from "../../components/CampaignTable";
import DateRangeComp from "../../components/DateRangeComp";
import SearchBarComp from "../../components/SearchBarComp";

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
    position: 'relative'
  },
  dateRangeComp: {
    position: 'absolute',
    right: '0',
    width: '30%'
  },
  tableContainer: {
    margin: '20px'
  }
});

const CampaignListFilterWithTable = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.mainContainer}>
        <div className={classes.searchContainer}>
          <div className={classes.dateRangeComp}>
            <DateRangeComp/>
          </div>          
          {/* // To Do  */}
          <SearchBarComp />
        </div>
        <div className={classes.tableContainer}>
          <CampaignTable />
        </div>
      </div>
    </>
  );
}

export default CampaignListFilterWithTable;