import { Dispatch } from "redux";
import { DateRange } from "rsuite/esm/DateRangePicker";
import { ICampaignTable } from "../../models/campaigntable.model";
import { getCampaignData, getUserData } from "../../services/campaigntable.service";

export const SET_CAMPAIGN_DATA = "SET_CAMPAIGN_DATA";
export const SEARCH_CAMPAIGN_VALUE = "SEARCH_CAMPAIGN_VALUE";
export const SEARCH_DATE_RANGE = "SEARCH_DATE_RANGE";
export const SET_MORE_DATA = "SET_MORE_DATA";
export const SHOW_LOADER = "SHOW_LOADER";
export const HIDE_LOADER = "HIDE_LOADER";

export const getCampaigns = () => async (dispatch: Dispatch) => {
  try {
    const res = await Promise.all([getCampaignData(), getUserData()]);
    dispatch({
      type: SHOW_LOADER
    });
    dispatch({
      type: SET_CAMPAIGN_DATA,
      payload: res,
    });

  } catch (err) {
    console.log(err);
  }
};

export const doCampaignSearch = (payload: string) => (dispatch: Dispatch) => {
  dispatch({
    type: SHOW_LOADER
  });
  dispatch({
    type: SEARCH_CAMPAIGN_VALUE,
    payload,
  });
};

export const doDateRangeSearch = (payload: DateRange | null) => (dispatch: Dispatch) => {
  dispatch({
    type: SHOW_LOADER
  });
  dispatch({
    type: SEARCH_DATE_RANGE,
    payload
  });
};

export const setMoreData = (payload: ICampaignTable[]) => (dispatch: Dispatch) => {
  dispatch({
    type: SHOW_LOADER
  });
  dispatch({
    type: SET_MORE_DATA,
    payload
  });
};