import SearchBar from "material-ui-search-bar";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { checkPayloadForCampaignData } from "../common/utils";
import { ICampaignTable } from "../models/campaigntable.model";
import {
  doCampaignSearch,
  setMoreData,
} from "../store/actions/campaigntable.action";

declare global {
  interface Window {
    AddCampaigns: (data: ICampaignTable[]) => void;
  }
}

const SearchBarComp = () => {
  const dispatch = useAppDispatch();
  const useAddCampaigns = (data: ICampaignTable[]) => {
    if (checkPayloadForCampaignData(data)) {
      dispatch(setMoreData(data));
    }
  };
  if (!window.AddCampaigns) {
    window.AddCampaigns = useAddCampaigns;
  }
  const [search, setSearch] = useState<string>("");

  const requestSearch = (searchedVal: string) => {
    setSearch(searchedVal);
    dispatch(doCampaignSearch(searchedVal));
  };

  const cancelSearch = () => {
    requestSearch("");
  };

  return (
    <SearchBar
      placeholder="Search by name"
      value={search}
      onChange={(searchVal) => requestSearch(searchVal)}
      onCancelSearch={() => cancelSearch()}
    />
  );
};

export default SearchBarComp;
