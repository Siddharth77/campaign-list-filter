import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import App from '../App';
import CampaignListFilterWithTable from '../pages/home/CampaignListFilterWithTable';

describe("<App />", () => {
  test('should render App component', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <App /> 
      </Provider>
    );
    expect(getByText).toBeTruthy();
  });
});
