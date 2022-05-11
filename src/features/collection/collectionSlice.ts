import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CollectionState {
    nfts: string[];
}

const initialState: CollectionState = {
    nfts: []
};

export const collectionSlice = createSlice({
  name: 'metamask',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setNfts: (state, action: PayloadAction<string[]>) => {
        state.nfts = [...action.payload];
    }
  },
});

export const { setNfts } = collectionSlice.actions;

export const selectNfts = (state: RootState) => state.collection.nfts;

export default collectionSlice.reducer;
