import { useAppDispatch } from "./app/hooks";
import { ICampaignTable } from "./models/campaigntable.model"
import { setMoreData } from "./store/actions/campaigntable.action";

declare global {
  interface Window {
    AddCampaigns?: any;
  }
}

function AddCampaigns(data: ICampaignTable[]) {
  const dispatch = useAppDispatch();
  dispatch(setMoreData(data));
}
window.AddCampaigns = AddCampaigns;
