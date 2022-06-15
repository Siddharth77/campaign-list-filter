import SearchBar from "material-ui-search-bar";
import { useState } from "react";
import mockCampaignData from '../mock-data/MockCampaignData.json';
import { ICampaignTable } from "../Models/CampaignTable";

//TO DO LATER
const SearchBarComp = () => {
    const [search, setSearch] = useState<string>('');
    const [tableData, setTableData] = useState<ICampaignTable[]>(mockCampaignData);

    const cancelSearch = () => {
        setSearch('');
        requestSearch(search);
    };

    const requestSearch = (searchedVal: string) => {
        const filteredRows = mockCampaignData.filter((row) => {
          return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setTableData(filteredRows);
    };

    return (
        <SearchBar
          value={search}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
    )
}

export default SearchBarComp;