import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';

describe("<App />", () => {
  test("should display campaign list with filters", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <App /> 
      </Provider>
    );
  });
});
