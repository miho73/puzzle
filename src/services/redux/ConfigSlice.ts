import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ConfigState {
  translationToggle: boolean;
  selectionToggle: boolean;
  loaded: boolean;
}

const initialState: ConfigState = {
  translationToggle: false,
  selectionToggle: false,
  loaded: false
}

export const configSlice = createSlice({
  name: 'config',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.translationToggle = initialState.translationToggle;
      localStorage.setItem(
        'cfg',
        JSON.stringify(initialState)
      );
    },
    set: (state, newState: PayloadAction<ConfigState>) => {
      state.translationToggle = newState.payload.translationToggle;
      state.selectionToggle = newState.payload.selectionToggle;
      localStorage.setItem(
        'cfg',
        JSON.stringify(newState.payload)
      )
    },
    load: (state, newState: PayloadAction<ConfigState>) => {
      state.translationToggle = newState.payload.translationToggle;
      state.selectionToggle = newState.payload.selectionToggle;
      state.loaded = true;
    }
  }
});

export const { reset, set, load } = configSlice.actions;
export default configSlice.reducer;
