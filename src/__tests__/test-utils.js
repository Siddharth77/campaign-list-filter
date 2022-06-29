import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { campaignDataReducer } from "../store/reducers/campaign-data.reducer";

const reducer = combineReducers({
  campaignDataReducer,
});
//custom render that includes redux provider
const render = (
  ui,
  {
    initialState,
    store = configureStore(
      {
        reducer,
      },
      initialState
    ),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
