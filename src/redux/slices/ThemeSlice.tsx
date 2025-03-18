import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeType = 'light' | 'dark' | 'blue' | 'green';

interface ThemeState {
  theme: ThemeType;
}

const initialState: ThemeState = {
  theme: 'light',
};

const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = ThemeSlice.actions;
export default ThemeSlice.reducer;
