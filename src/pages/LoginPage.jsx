import React from 'react';
import  {Login} from 'components/Login';
import { Link } from 'react-router-dom';
import './pages.css';


const LoginPage = () => {
  return (
    <div className="auth-menu">
    <div className="auth-menu__box">
        <h1>Авторизация</h1>
        <Login />
        <p>
            Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
        </p>
        </div>
    </div>
  )
}

export default LoginPage