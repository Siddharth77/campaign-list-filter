import http from './http-common';
import { mockCampaignData } from '../mock-data/MockCampaignData'
import { ICampaignTable, IUserData } from '../Models/CampaignTable';

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