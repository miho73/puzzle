import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface PuzzleState {
  cols?: number;
  rows?: number;
  imageUrl?: string;
}

const initialState: PuzzleState = {
  cols: undefined,
  rows: undefined,
  imageUrl: undefined
}

export const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.cols = undefined;
      state.rows = undefined;
      state.imageUrl = undefined;
    },
    initializePuzzle: (state, action: PayloadAction<PuzzleState>) => {
      const {cols, rows, imageUrl} = action.payload;

      state.cols = cols;
      state.rows = rows;
      state.imageUrl = imageUrl;
    }
  }
});

export const { initializePuzzle, reset } = puzzleSlice.actions;
export default puzzleSlice.reducer;
