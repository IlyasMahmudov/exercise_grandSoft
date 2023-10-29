import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from './dataActions';
import { DataState } from '../types';

const initialState: DataState = {
  info: [],
  isLoading: false,
};

const rtkSlice = createSlice({
  name: 'sliceData',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addUser: (state, action) => {
      state.info.push(action.payload);
    },
    editUser: (state, action) => {
      state.info = state.info.map((el) =>
        el.id === action.payload.editingUserId
          ? { ...el, name: action.payload.login, email: action.payload.email }
          : el
      );
    },
    deleteUser: (state, action) => {
      state.info = state.info.filter((el) => el.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.info = action.payload;
      state.isLoading = false;
    });
  },
});

export default rtkSlice.reducer;
export const { setLoading } = rtkSlice.actions;
export const { addUser, editUser, deleteUser } = rtkSlice.actions;
