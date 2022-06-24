import { makeStyles } from "@material-ui/core";
import CampaignTableComp from "../../components/CampaignTableComp";
import DateRangePickerComp from "../../components/DateRangePickerComp";
import SearchBarComp from "../../components/SearchBarComp";

const useStyles = makeStyles({
  mainContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "aliceblue",
  },
  searchContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
    position: "relative",
  },
  tableContainer: {
    margin: "20px",
  },
  heading: {
    margin: "20px",
    color: "steelblue",
  },
  parent: {
    height: "100vh",
    backgroundColor: "aliceblue",
  },
});

const CampaignList = () => {
  const classes = useStyles();

  return (
    <div className={classes.parent}>
      <div className={classes.mainContainer}>
        <h1 className={classes.heading} data-testid="campaign-list-heading">
          Campaign List Filters by Date Range and Name
        </h1>
        <div className={classes.searchContainer}>
          <DateRangePickerComp />
          <SearchBarComp />
        </div>
        <div className={classes.tableContainer}>
          <CampaignTableComp />
        </div>
      </div>
    </div>
  );
};

export default CampaignList;
