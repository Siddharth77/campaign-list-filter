import http from './http-common';
import { mockCampaignData } from '../mock-data/_mockcampaigndata'
import { ICampaignTable, IUserData } from '../models/campaigntable.model';

export const getCampaignData = () => {
    return new Promise<ICampaignTable[]>((resolve) => {
        resolve(mockCampaignData)
    })
};

export const getUserData = () => {
    return http.get<IUserData[]>(`https://jsonplaceholder.typicode.com/users`).then(res => {
        return res.data
    });
};