import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types';


export const fetchData = createAsyncThunk('API data', async ()=> {
    try {
        const response = await fetch(`${import.meta.env.VITE_URL}`);
        if (!response.ok) {
          throw new Error('Ошибка при запросе к пользователям');
        }
        const resultUsers: User[] = await response.json();
        return resultUsers
      } catch (error) {
        console.error('Ошибка при запросе к пользователям:', error);
        throw error;
      }
})

