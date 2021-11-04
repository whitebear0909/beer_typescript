import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import beerReducer from '../module/beers/beersSlice';

export const store = configureStore({
  reducer: {
    beer: beerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
