import { AnyAction } from "@reduxjs/toolkit";
import { ICampaignTable } from "../../models/campaigntable.model";
import { SEARCH_CAMPAIGN_VALUE, SEARCH_DATE_RANGE, SET_CAMPAIGN_DATA, SET_MORE_DATA } from "../actions/campaigntable.action";
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { dateRangeFilter, searchFilter, updateCampaignTable } from "../../common/utils";

interface ICampaignStore {
    originalCampaignData: ICampaignTable[],
    finalCampaignData: ICampaignTable[],
    search?: string;
    dateRange?: DateRange
}

const initialState: ICampaignStore = {
    originalCampaignData: [],
    finalCampaignData: []
};

export function campaignDataReducer(campaigns = initialState, action: AnyAction) {
  const { type, payload } = action;
  const {originalCampaignData, dateRange, search} = campaigns;
  switch (type) {
    case SET_CAMPAIGN_DATA:
        const [campaignData, userData] = payload;
        const finalCampaignDataVal = updateCampaignTable(campaignData, userData);
        return {    
            originalCampaignData: finalCampaignDataVal, 
            finalCampaignData: finalCampaignDataVal
        };
    case SEARCH_CAMPAIGN_VALUE:
        let updatedFinalCampaignData = originalCampaignData;
        if(dateRange) {
          updatedFinalCampaignData = dateRangeFilter(updatedFinalCampaignData, dateRange);
        }
        updatedFinalCampaignData = searchFilter(updatedFinalCampaignData, payload.trim());
        return {...campaigns, finalCampaignData: updatedFinalCampaignData, search: payload.trim()};
    case SEARCH_DATE_RANGE:
        let finalCampaignDataValue = originalCampaignData;
        if(search) {
          finalCampaignDataValue = searchFilter(finalCampaignDataValue, search);
        }
        if (payload) {
          finalCampaignDataValue = dateRangeFilter(finalCampaignDataValue, payload);
        }
        return {...campaigns, finalCampaignData: finalCampaignDataValue, dateRange: payload};
    case SET_MORE_DATA:
        const moreDataToSet = payload;
        return {
          originalCampaignData: [...originalCampaignData, ...moreDataToSet],
          finalCampaignData: [...originalCampaignData, ...moreDataToSet]
        }
    default:
        return campaigns;
  }
};