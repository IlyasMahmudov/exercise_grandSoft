/* eslint-disable @typescript-eslint/no-explicit-any */

import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { RootState } from './store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

type DispatchFuncThunk = () => ThunkDispatch<RootState, any, AnyAction>;

export const useAppDispatch: DispatchFuncThunk = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;