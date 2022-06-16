import { AnyAction } from "@reduxjs/toolkit";
import { ICampaignTable, IUserData } from "../../models/campaigntable.model";
import { SEARCH_CAMPAIGN_VALUE, SEARCH_DATE_RANGE, SET_CAMPAIGN_DATA, SET_MORE_DATA } from "../actions/campaigntable.action";
import { DateRange } from 'rsuite/esm/DateRangePicker';
import moment from "moment";

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

function searchFilter(campaignData: ICampaignTable[], search: string) {
  return campaignData.filter(val => val.name.toLowerCase().includes(search.toLowerCase()));
}

function dateRangeFilter(campaignData: ICampaignTable[], dateRange: DateRange) {
  let selStartDate = moment(dateRange[0]).format("MM/DD/YYYY");
  let selEndDate = moment(dateRange[1]).format("MM/DD/YYYY");
  return campaignData.filter((val) => {
    const startDateInBetween = moment(selStartDate).isBetween(val.startDate, val.endDate, undefined, '[]');
    if(startDateInBetween) {
      return true;
    }
    const endDateInBetween = moment(selEndDate).isBetween(val.startDate, val.endDate, undefined, '[]');
    return endDateInBetween;    
  })
}
function updateCampaignTable(campaignData: ICampaignTable[], userData: IUserData[]) {
  return campaignData.map((campaign) => {
    let {userId, username} = filterUserById(userData, campaign);
    return {...campaign, userId, username};
  })
}

function filterUserById (userData: IUserData[], campaign: ICampaignTable) {
    let obj: any = {
      username: campaign.username || 'Unknown User',
      userId: campaign.userId
    };
    let filteredUser: IUserData[] = userData.filter((user: IUserData) => campaign.userId === user.id);
    if(filteredUser.length) {
      obj.username = filteredUser[0].name;
    };
    return obj;
}