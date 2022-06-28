import http from "./http-common";
import { mockCampaignData } from "../mock-data/_mockcampaigndata";
import { ICampaignTable, IUserData } from "../models/campaigntable.model";
import { rangeComparer } from "../common/utils";

export const getCampaignData = () => {
    return new Promise<ICampaignTable[]>((resolve) => {
        const arrWithActive = mockCampaignData?.map(val => ({ ...val, isActive: rangeComparer(val?.startDate, val?.endDate) }));
        resolve(arrWithActive);
    });
};

export const getUserData = () => {
    return http.get<IUserData[]>("https://jsonplaceholder.typicode.com/users").then(res => {
        return res.data;
    });
};