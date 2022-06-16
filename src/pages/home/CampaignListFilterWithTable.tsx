import { makeStyles } from "@material-ui/core";
import CampaignTable from "../../components/CampaignTable";
import DateRangePickerComp from "../../components/DateRangePickerComp";
import SearchBarComp from "../../components/SearchBarComp";

const useStyles = makeStyles({
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'lightsteelblue'
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
    position: 'relative'
  },
  tableContainer: {
    margin: '20px'
  },
  heading: {
    margin: '20px'
  },
  parent: {
    height: '100vh',
    backgroundColor: 'lightsteelblue'
  }
});

const CampaignListFilterWithTable = () => {
  const classes = useStyles();

  return (
    <div className={classes.parent}>
      <div className={classes.mainContainer}>
        <h1 className={classes.heading}>Campaign List Filters by Date Range and Name</h1>
        <div className={classes.searchContainer}>
          <DateRangePickerComp/>          
          <SearchBarComp />
        </div>
        <div className={classes.tableContainer}>
          <CampaignTable />
        </div>
      </div>
    </div>
  );
}

export default CampaignListFilterWithTable;