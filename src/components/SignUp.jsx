import { FormReg } from './FormReg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Компонент для страницы регистрации
const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Обрабатывает регистрацию пользователя с помощью электронной почты и пароля
    const handleRegister = (email, password) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                localStorage.setItem('user', JSON.stringify({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
                navigate('/');
            })
            .catch(console.error);
    }

    // Отображает регистрационную форму с помощью обратного вызова "handleRegister"
    return (
        <FormReg
            title='Принять'
            handleClick={handleRegister}
        />
    )
}

export { SignUp }
