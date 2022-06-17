export interface IUserData {
    id: number,
    name: string,
    username: string,
    email: string,
    address: IAddress,
    phone: string,
    website: string,
    company: ICompany
}

export interface IAddress {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: IGeo
}

export interface IGeo {
    lat: string,
    lng: string
}

export interface ICompany {
    name: string,
    catchPhrase: string,
    bs: string
}

export interface ICampaignTable {
    id: number,
    name: string,
    username?: string,
    startDate: string,
    endDate: string,
    isActive?: boolean,
    Budget: number,
    userId: number
}