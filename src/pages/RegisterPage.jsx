import { SignUp } from 'components/SignUp'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './pages.css';

// Компонент страницы для регистрации пользователя
const RegisterPage = () => {
  const [value, setValue] = useState('');
  const [isChangeUserVisible, setChangeUserVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState('/public/onebackground.png'); // Состояние для выбора фона и видимости изменений пользователем
  const [previewBackground, setPreviewBackground] = useState(selectedBackground);

  // Эффект для настройки фона и информации о пользователе
  useEffect(() => {
    const storedBackground = localStorage.getItem('selectedBackground');
    if (storedBackground) {
      setSelectedBackground(storedBackground);
      document.body.style.backgroundImage = `url(${storedBackground})`;
      setPreviewBackground(storedBackground);
    }
    // Извлечение и устанавление информации о пользователе из локального хранилища
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);
  
  return (
    <div className='header'>
      <div className='navbar'>
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
                <span className='menu__item aboutnote'>
                  <img src='/helpful.png' alt='Note Icon' className='icon'></img>
                  Справка
                </span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className='container'>
        <SignUp />
      </div>
    </div>
  )
}

export default RegisterPage
