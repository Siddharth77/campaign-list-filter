import moment from "moment";

export const compareStartDateWithEndDate = (startDate: moment.MomentInput, endDate: moment.MomentInput) => {    
    return moment(endDate).diff(startDate) > 0;
}