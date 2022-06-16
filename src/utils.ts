import moment from "moment";

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