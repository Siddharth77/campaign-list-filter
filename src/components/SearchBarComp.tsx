import SearchBar from "material-ui-search-bar";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { doCampaignSearch } from "../store/actions/campaigntable.action";

//TO DO LATER
const SearchBarComp = () => {
    const [search, setSearch] = useState<string>('');
    const dispatch = useAppDispatch();

    const requestSearch = (searchedVal: string) => {
        dispatch(doCampaignSearch(searchedVal));
    };

    const cancelSearch = () => {
        dispatch(doCampaignSearch(''));
    };

    return (
        <SearchBar
          placeholder="Search by name"
          value={search}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        />
    )
}

export default SearchBarComp;