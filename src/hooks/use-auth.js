import { useSelector } from 'react-redux';

// Пользовательский хук для доступа к статусу аутентификации и данным пользователя из хранилища Redux
export function useAuth() {
    const { email, token, id } = useSelector(state => state.user);

    // Возвращает состояние авторизации пользователя
    return {
        isAuth: !!email,
        email,
        token,
        id,
    };
}
