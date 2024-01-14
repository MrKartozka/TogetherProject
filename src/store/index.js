import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// Настройка хранилища Redux 
export const store = configureStore({
    reducer: {
        user: userReducer,
    }
})
