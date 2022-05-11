import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface MarketState {
    market_list: string[];
}

const initialState: MarketState = {
    market_list: []
};

export const marketSlice = createSlice({
  name: 'metamask',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setMarketList: (state, action: PayloadAction<string[]>) => {
        state.market_list = [...action.payload];
    }
  },
});

export const { setMarketList } = marketSlice.actions;

export const selectMarketList = (state: RootState) => state.market.market_list;

export default marketSlice.reducer;
