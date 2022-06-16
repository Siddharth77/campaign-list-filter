import { ICampaignTable } from "./models/campaigntable.model"

declare global {
  interface Window {
    AddCampaigns?: any;
  }
}

const AddCampaigns= (data: ICampaignTable ) => {
  console.log(data);  
}
window.AddCampaigns = AddCampaigns;
