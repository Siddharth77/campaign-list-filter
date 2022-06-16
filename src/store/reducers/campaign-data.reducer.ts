import { AnyAction } from "@reduxjs/toolkit";
import { ICampaignTable, IUserData } from "../../models/campaigntable.model";
import { SEARCH_CAMPAIGN_VALUE, SEARCH_DATE_RANGE, SET_CAMPAIGN_DATA } from "../actions/campaigntable.action";
import { DateRange } from 'rsuite/esm/DateRangePicker';
import moment from "moment";

interface ICampaignStore {
    originalCampaignData: ICampaignTable[],
    finalCampaignData: ICampaignTable[]
}

const initialState: ICampaignStore = {
    originalCampaignData: [],
    finalCampaignData: []
};

export function campaignDataReducer(campaigns = initialState, action: AnyAction) {
  const { type, payload } = action;
  switch (type) {
    case SET_CAMPAIGN_DATA:
        const [campaignData, userData] = payload;
        const finalCampaignDataVal = updateCampaignTable(campaignData, userData);
        return {    
            originalCampaignData: finalCampaignDataVal, 
            finalCampaignData: finalCampaignDataVal
        };
    case SEARCH_CAMPAIGN_VALUE:
        const search = payload;
        const {originalCampaignData} = campaigns;
        const finalCampaignData = originalCampaignData.filter(val => val.name.toLowerCase().includes(search.toLowerCase()));
        return {...campaigns, finalCampaignData};
    case SEARCH_DATE_RANGE:
        const range = payload;
        const finalCampaignDataValue = dateRangeFilter(campaigns.originalCampaignData, range);
        return {
          originalCampaignData: finalCampaignDataValue,
          finalCampaignData: finalCampaignDataValue
        };
    default:
        return campaigns;
  }
};

function dateRangeFilter(campaignData: ICampaignTable[], dateRange: DateRange) { 
  let selStartDate = moment(dateRange[0]).format('MM/DD/YYYY');
  let selEndDate = moment(dateRange[1]).format('MM/DD/YYYY');
  return campaignData.filter((val) => {
    if((moment(val.startDate).isBefore(selStartDate) && moment(val.endDate).isAfter(selEndDate))){
      return true;
    } else {
      return false;
    }
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