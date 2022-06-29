import { render, screen, cleanup } from "./test-utils";
import SearchBarComp from "../components/SearchBarComp";
import "@testing-library/jest-dom";

beforeEach(() => {
  render(<SearchBarComp />);
});

afterEach(() => {
  cleanup();
});

describe("<SearchBarComp />", () => {
  test("checking that search bar component to be defined", () => {
    const component = render(<SearchBarComp />);
    expect(component).toBeDefined();
  });
  test("search value is empty when not given anything", () => {
    const input = screen.getByRole("textbox");
    expect(input.textContent).toBe("");
  });
});
