import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import CampaignList from '../pages/home/CampaignList';

describe("<CampaignList />", () => {
  test('should render CampaignList component', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <CampaignList /> 
      </Provider>
    );
    expect(getByText).toBeTruthy();
  });
});
