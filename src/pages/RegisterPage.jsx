import { SignUp } from 'components/SignUp'
import React from 'react'
import { Link } from 'react-router-dom';
import './pages.css';

const RegisterPage = () => {
  return (
    <div className="auth-menu">
    <div className="auth-menu__box">
        <h1>Регистрация</h1>
        <SignUp />
        <p>
            Уже есть аккаунт? <Link to="/login">Войти</Link>
        </p>
    </div>
    </div>
  )
}

export default RegisterPage