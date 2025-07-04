import { configureStore } from '@reduxjs/toolkit';
import puzzleReducers from './PuzzleSlice.ts';

const store = configureStore({
  reducer: {
    puzzle: puzzleReducers
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
