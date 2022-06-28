import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import CampaignList from "../pages/home/CampaignList";
import "@testing-library/jest-dom/extend-expect";

describe("<CampaignList />", () => {
  test("should check for CampaignList component test id defined", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <CampaignList /> 
      </Provider>
    );
    expect(getByTestId("campaign-list-heading")).toHaveTextContent("Campaign List Filters by Date Range and Name");
  });
});
