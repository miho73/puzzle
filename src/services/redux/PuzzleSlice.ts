import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface PuzzleState {
  horizontalPieces?: number;
  verticalPieces?: number;
  imageUrl?: string;
}

const initialState: PuzzleState = {
  horizontalPieces: undefined,
  verticalPieces: undefined,
  imageUrl: undefined
}

export const puzzleSlice = createSlice({
  name: 'puzzle',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.horizontalPieces = undefined;
      state.verticalPieces = undefined;
      state.imageUrl = undefined;
    },
    initializePuzzle: (state, action: PayloadAction<PuzzleState>) => {
      const {horizontalPieces, verticalPieces, imageUrl} = action.payload;

      state.horizontalPieces = horizontalPieces;
      state.verticalPieces = verticalPieces;
      state.imageUrl = imageUrl;
    }
  }
});

export const { initializePuzzle, reset } = puzzleSlice.actions;
export default puzzleSlice.reducer;
