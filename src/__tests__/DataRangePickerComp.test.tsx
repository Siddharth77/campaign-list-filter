import { render, screen, cleanup } from "./test-utils";
import DateRangePickerComp from "../components/DateRangePickerComp";
import "@testing-library/jest-dom";

beforeEach(() => {
  render(<DateRangePickerComp />);
});

afterEach(() => {
  cleanup();
});

describe("<DateRangePickerComp />", () => {
  test("checking that date range picker component to be defined", () => {
    const component = render(<DateRangePickerComp />);
    expect(component).toBeDefined();
  });
  test("search value is empty when not given anything", () => {
    const input = screen.getByPlaceholderText("Select Date Range");
    expect(input.textContent).toBe("");
  });
});
