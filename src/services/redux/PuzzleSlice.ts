import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface PuzzleState {
  horizontalPieces?: number;
  verticalPieces?: number;
  imageData?: ArrayBuffer | null;
}

const initialState: PuzzleState = {
  horizontalPieces: 0,
  verticalPieces: 0,
  imageData: null
}

export const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.horizontalPieces = 0;
      state.verticalPieces = 0;
      state.imageData = null;
    },
    initializePuzzle: (state, action: PayloadAction<PuzzleState>) => {
      const {horizontalPieces, verticalPieces, imageData} = action.payload;

      state.horizontalPieces = horizontalPieces;
      state.verticalPieces = verticalPieces;
      state.imageData = imageData || null;
    }
  }
});

export const { initializePuzzle, reset } = puzzleSlice.actions;
export default puzzleSlice.reducer;
