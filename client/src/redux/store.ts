import { configureStore } from '@reduxjs/toolkit';
import sliceData from './sliceData';

export const store = configureStore({ reducer: { sliceData } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
