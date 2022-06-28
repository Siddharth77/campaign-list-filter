import { AnyAction } from "@reduxjs/toolkit";
import { ICampaignTable, IUserData } from "../../models/campaigntable.model";
import { SEARCH_CAMPAIGN_VALUE, SEARCH_DATE_RANGE, SET_CAMPAIGN_DATA, SET_MORE_DATA, SHOW_LOADER } from "../actions/campaigntable.action";
import { DateRange } from "rsuite/esm/DateRangePicker";
import { checkPayloadForCampaignData, dateRangeFilter, searchFilter, updateCampaignTable } from "../../common/utils";
import { uniqBy } from "lodash";

interface ICampaignStore {
  originalCampaignData: ICampaignTable[],
  finalCampaignData: ICampaignTable[],
  userData: IUserData[],
  search?: string;
  dateRange?: DateRange,
  loading: boolean
}

const initialState: ICampaignStore = {
  originalCampaignData: [],
  finalCampaignData: [],
  userData: [],
  loading: true
};

export function campaignDataReducer(campaigns = initialState, action: AnyAction) {
  const { type, payload } = action;
  const { originalCampaignData, userData, dateRange, search } = campaigns;
  switch (type) {
    case SET_CAMPAIGN_DATA: {
      const [campaignData, userDataList] = payload;
      const finalCampaignDataVal = updateCampaignTable(campaignData, userDataList);
      return {
        originalCampaignData: finalCampaignDataVal,
        finalCampaignData: finalCampaignDataVal,
        userData: userDataList,
        loading: false
      };
    }
    case SEARCH_CAMPAIGN_VALUE: {
      let updatedFinalCampaignData = originalCampaignData;
      if (dateRange) {
        updatedFinalCampaignData = dateRangeFilter(updatedFinalCampaignData, dateRange);
      }
      updatedFinalCampaignData = searchFilter(updatedFinalCampaignData, payload.trim());
      return { ...campaigns, finalCampaignData: updatedFinalCampaignData, search: payload.trim(), loading: false };
    }
    case SEARCH_DATE_RANGE: {
      let finalCampaignDataValue = originalCampaignData;
      if (search) {
        finalCampaignDataValue = searchFilter(finalCampaignDataValue, search);
      }
      if (payload) {
        finalCampaignDataValue = dateRangeFilter(finalCampaignDataValue, payload);
      }
      return { ...campaigns, finalCampaignData: finalCampaignDataValue, dateRange: payload, loading: false };
    }
    case SET_MORE_DATA: {
      const isValidPayload = checkPayloadForCampaignData(payload);
      let allData = [...originalCampaignData];
      if (isValidPayload) {
        allData = uniqBy([...originalCampaignData, ...payload], ({ id }) => id);
      }
      allData = updateCampaignTable(allData, userData);
      let filterData = [...allData];
      if (search) {
        filterData = searchFilter(filterData, search);
      }
      if (dateRange) {
        filterData = dateRangeFilter(filterData, dateRange);
      }
      return {
        ...campaigns,
        originalCampaignData: allData,
        finalCampaignData: filterData,
        loading: false
      }
    }
    case SHOW_LOADER:
      return { ...campaigns, loading: true }
    default:
      return campaigns;
  }
}