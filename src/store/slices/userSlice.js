import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: null,
    token: null,
    id: null,
};

// Фрагмент для обработки состояния пользователя в приложении
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Устанавливаем состояние пользователя
        setUser(state, action) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        // Очищаем состояние пользователя
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
        },
    },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
