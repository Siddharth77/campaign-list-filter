import moment from "moment";
import { DateRange } from 'rsuite/esm/DateRangePicker';
import { ICampaignTable, IUserData } from "../models/campaigntable.model";

export const compareStartDateWithEndDate = (startDate: moment.MomentInput, endDate: moment.MomentInput) => {    
    return moment(endDate).diff(startDate) > 0;
}

/**
 * For setting icons for active and inactive status
 * @param startDate 
 * @param endDate 
 * @returns 
 */
export const rangeComparer = (startDate: string, endDate: string): boolean => {
    let compareDate = moment();    
    let givenStartDate   = moment(startDate, 'MM/DD/YYYY');   
    let givenEndDate     = moment(endDate, 'MM/DD/YYYY');     
    return compareDate.isBetween(givenStartDate, givenEndDate, undefined, '[]');
}

/**
 * For formatting the table date of Budget column
 * @param num 
 * @returns 
 */
export const numberFormatter = (num: number) => {
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

export function searchFilter(campaignData: ICampaignTable[], search: string) {
    return campaignData.filter(val => val.name.toLowerCase().includes(search.toLowerCase()));
}

export function dateRangeFilter(campaignData: ICampaignTable[], dateRange: DateRange) {
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

export function updateCampaignTable(campaignData: ICampaignTable[], userData: IUserData[]) {
    return campaignData.map((campaign) => {
        let {userId, username} = filterUserById(userData, campaign);
        return {...campaign, userId, username};
    })
}
  
export function filterUserById (userData: IUserData[], campaign: ICampaignTable) {
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