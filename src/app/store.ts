import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { campaignDataReducer } from '../store/reducers/campaign-data';

const reducer = {
  campaigns: campaignDataReducer,
}

const preloadedState = {};

export const store = configureStore({
  reducer,
  preloadedState
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
