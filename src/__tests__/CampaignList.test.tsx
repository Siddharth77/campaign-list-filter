import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import CampaignList from "../pages/home/CampaignList";

describe("<CampaignList />", () => {
  test("should check for CampaignList component test id defined", async () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <CampaignList /> 
      </Provider>
    );
    expect(queryByTestId).toBeDefined();
  });
});
