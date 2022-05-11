import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import metamaskReducer from '../features/metamask/metamaskSlice';
import collectionReducer from '../features/collection/collectionSlice';
import marketReducer from '../features/market/marketSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    metamask: metamaskReducer,
    collection: collectionReducer,
    market: marketReducer
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
