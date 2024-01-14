import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/slices/userSlice';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

// Функциональный компонент для регистрационной формы
const FormReg = ({ title, handleClick }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // Переключает видимость пароля
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    // Обрабатывает регистрацию пользователя
    const handleRegistration = () => {
        if (pass !== confirmPass) {
            alert("Пароли не совпадают");
            return;
        } else if (pass.length < 5) {
            alert(`Длина вашего пароля должна быть от 5 до 16 символов`)
            return;
        }
        handleClick(email, pass);
    };

    // Обрабатывает вход в систему Google
    const signInWithGoogle = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

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
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='auth-menu-reg'>
            <div className='auth-menu__box'>
                <h1>Регистрация</h1>
                <input 
                    className='emailbox'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Почта...'
                    maxLength={30}
                />
                <div className='password-container'>
                <input 
                    className='passwordbox'
                    type={isPasswordVisible ? 'text' : 'password'}
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder='Пароль...'
                    maxLength={16}
                />
                <img 
                    src= {isPasswordVisible ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAASVJREFUSEvtlMFNw0AQRV86IVckGuBEKgmcUgZQCXBLF8mNAhBn0gIVgB6srcWe8ToSuWUlyyvvzP9/vmdnwYnX4sT4nAmaDrcsugDWwA3g3udQUH2/AM9TLFME98BDU+IvoSSPUWxEoMqnonoGfh8i0aqq8OdgSJCBm6xClRqjZVbovl4jkiHBLlBu0jIoRXDjI5I+via4LdYMse6K8itgC3wCG+CtiJEky/lj0UegxkTVWMU7cFmQXoHrEm/ecPVV1xVE9rQIPP+aS5BZZGfsgciilq2jLvqPn6wYRaVtmnWGLerNddmm3pXU+4zA71n7BXijOzBq52xUdDNozqiQxbjZo6KW1d1aB15nTT3s9DsEnrKoZcVR561xfRRYFHwmaFr4Dfk2Pxn3UZ+9AAAAAElFTkSuQmCC" : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAVRJREFUSEu1ldFRAzEMRPc6CZWQVAJUQlIJUAlQCXQC8zLejKKTL/5wPJNx7MvprVa2sujOY7lzfGXAq6QPSb+zwBFA8GMLfpgFiYCdpE9JzGQwBZItqiB7SY+SmHnO+GozdvK9a2lV5AgZLQXWlrXrAd6aYgNQabXsIYLfOCP2SlsrixzcabsmQLDJwV4kPbWDYSErSAZQZAd5aG+58NkuAO+SflIm7PHsPKpjmtWwriAW4JpFAYZfAayEgj2n49qDWORfSg+rzgJiBgZAx+98JyqIPefdOEpAvskxoANlCNkyPBvC+pQzYO0sqoC9Pd6Lx5Xs6QKrIvuHW9b0MokHw8UvARnCGkV8bIMh1R24Cl5ZFAvlCxfTT7VcFXbVIEf+cDiyqDUo3uzv   1iLcNm7e5C2FW8+6rX4kg1FohJQ3eTTQrUzoZfSj7imaAbrEmGlRKewfWrhhGfTAcnwAAAAASUVORK5CYII="}
                    alt='Show password'
                    onClick={togglePasswordVisibility}
                    className='password-toggle-icon'
                />
                </div>
                <div className='password-container'>
                <input
                    className='passwordbox'
                    type='password'
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder='Подтвердите пароль...'
                    maxLength={16}
                />

                </div>
                <button className='buttonbox' onClick={handleRegistration}>
                    {title}
                </button>
            </div>
            <div className='registerlink'>
                <p>
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
                </p>
                <button onClick={signInWithGoogle} className='googlelink'>Войти с помощью <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 48 48">
<path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
</svg></button>
            </div>
        </div>
    )
}

export { FormReg }
