import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import SearchBarComp from "../components/SearchBarComp";
import "@testing-library/jest-dom";

test('search value is empty when not given anything', () => {
  render(
    <Provider store={store}>
      <SearchBarComp />
    </Provider>
  );
  const input = screen.getByRole("textbox");
  expect(input.textContent).toBe("");
});
