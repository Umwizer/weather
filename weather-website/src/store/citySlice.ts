import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type CityState = {
  value: string;
};

const initialState: CityState = {
  value: 'Kigali',
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setCity } = citySlice.actions;

export default citySlice.reducer;