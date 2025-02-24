// ActiveButtonProfile.ts (или ActiveButtonProfileSlice.ts)
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  active: 'Посты',
};

const activeSlice = createSlice({
  name: 'active',
  initialState,
  reducers: {
    setActive(state, action) {
      state.active = action.payload;
    },
  },
});

export const { setActive } = activeSlice.actions;

// Экспортируем только редьюсер, а не сам слайс
export const activeReducer = activeSlice.reducer;

export default activeSlice.reducer;
