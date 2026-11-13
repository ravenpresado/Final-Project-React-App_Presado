
import { configureStore } from '@reduxjs/toolkit';
import selectionsReducer from '../features/selections/selectionsSlice';

export const store = configureStore({
  reducer: {
    selections: selectionsReducer,
  },
});
