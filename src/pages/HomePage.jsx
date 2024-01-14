import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks/use-auth';
import { removeUser } from 'store/slices/userSlice';

// Компонент домашней страницы, который отображается после входа пользователя в систему
const HomePage = () => {
  const dispatch = useDispatch();

  const { isAuth, email } = useAuth(); // Получение статуа авторизации и адреса электронной почты

  return isAuth ? ( // Условный рендеринг на основе состояния аутентификации
    <div>
      <h1>Welcome</h1>

      <button
        onClick={() => dispatch(removeUser())}
      >Log out from {email}</button>
    </div>
  ) : (
    <Redirect to="/login" /> // Перенаправляет на страницу входа в систему, если не прошла аутентификация
  )
}

export default HomePage
