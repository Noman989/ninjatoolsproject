import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface MetamaskState {
    address?: string;
}

const initialState: MetamaskState = {
};

export const metamaskSlice = createSlice({
  name: 'metamask',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setAddress: (state, action: PayloadAction<string | undefined>) => {
        state.address = action.payload;
    }
  },
});

export const { setAddress} = metamaskSlice.actions;

export const selectAddress = (state: RootState) => state.metamask.address;

export default metamaskSlice.reducer;
