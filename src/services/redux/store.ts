import { configureStore } from '@reduxjs/toolkit';
import puzzleReducers from './PuzzleSlice.ts';
import configReducers from './ConfigSlice.ts';

const store = configureStore({
  reducer: {
    puzzle: puzzleReducers,
    config: configReducers
  },
  middleware: (gDM) =>
    gDM({
      serializableCheck: false
    })
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
