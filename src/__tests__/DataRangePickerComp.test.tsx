import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import DateRangePickerComp from "../components/DateRangePickerComp";
import "@testing-library/jest-dom";

test("date range value is empty when not given anything", () => {
  render(
    <Provider store={store}>
      <DateRangePickerComp />
    </Provider>
  );
  const input = screen.getByPlaceholderText("Select Date Range");
  expect(input.textContent).toBe("");
});
