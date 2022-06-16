import { AnyAction } from "@reduxjs/toolkit";
import { ICampaignTable, IUserData } from "../../Models/CampaignTable";
import { SEARCH_CAMPAIGN_VALUE, SET_CAMPAIGN_DATA } from "../actions/campaignTable";

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
        return {...campaigns, finalCampaignData}
    default:
        return campaigns;
  }
};

function  updateCampaignTable(campaignData: ICampaignTable[], userData: IUserData[]) {
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