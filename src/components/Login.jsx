import { Form } from './Form';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

// Компонент для страницы входа в систему
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  // Обрабатывает вход пользователя с помощью электронной почты и пароля
  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(setUser({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
        }));
        console.log("User ID:", user.uid);
        localStorage.setItem('user', JSON.stringify({
          email: user.email,
          id: user.uid,
          token: user.accessToken,
        }));

        navigate('/');
      })
      .catch(console.error);
  }

// Отображает форму входа в систему с обратным вызовом 'handle Login'
  return (
    <Form
      title='Войти'
      handleClick={handleLogin}
    />
  )
}

export { Login }
