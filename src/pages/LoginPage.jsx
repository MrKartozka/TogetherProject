import React from 'react';
import  {Login} from 'components/Login';
import { Link } from 'react-router-dom';
import './pages.css';


const LoginPage = () => {
  return (
    <div className='header'>
      <div className='container'>
        <div className='navbar'>
    <div className="auth-menu">
    <div className="auth-menu__box">
    <div className='hamburger-menu'>
            <input id='menu__toggle' type='checkbox' />
            <label className='menu__btn' htmlFor='menu__toggle'>
              <span></span>
            </label>
            <ul className='menu__box'>
            <Link to="/" className="mainpage-button">
              <li>
                <span className='menu__item'>
                <img src='notes.png' alt='Note Icon' className='icon'></img>
                Заметки
                </span>
              </li>
              </Link>
              <Link to="/TodoBackground" className="background-button">
              <li>
                <span className='menu__item'>
                <img src='/backstyle.png' alt='Note Icon' className='icon'></img>
                <span>Фон</span>
                </span>
              </li>
              </Link>
              <Link to="/TodoBacket" className="backet-button">
              <li>
                <span className='menu__item'>
                <img src='/trash.png' alt='Note Icon' className='icon'></img>
                Корзина
                </span>
              </li>
              </Link>
              <Link to="/TodoInfo" className="info-button">
              <li>
                <span className='menu__item'>
                <img src='/helpful.png' alt='Note Icon' className='icon'></img>
                Справка
                </span>
              </li>
              </Link>
            </ul>
          </div>
        <h1>Авторизация</h1>
        <Login />
        <p>
            Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
        </p>
        </div>
    </div>
    </div>
      </div>
    </div>
  )
}

export default LoginPage