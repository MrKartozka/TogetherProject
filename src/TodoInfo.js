import React, { useState, useEffect } from 'react';
import './Сheckbox.css';
import './App.css';
import './TodoInfo.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function App() {
  const [value, setValue] = useState('');
  const [isChangeUserVisible, setChangeUserVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState('/public/onebackground.png');
  const [previewBackground, setPreviewBackground] = useState(selectedBackground);

  useEffect(() => {
    const storedBackground = localStorage.getItem('selectedBackground');
    if (storedBackground) {
      setSelectedBackground(storedBackground);
      document.body.style.backgroundImage = `url(${storedBackground})`;
      setPreviewBackground(storedBackground);
    }
    // Check local storage for the user's login status
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }

    
  }, []);

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('user');

    // Set the user state to null
    setUser(null);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const toggleChangeUser = () => {
    setChangeUserVisible(!isChangeUserVisible);
  };

  const closeChangeUser = () => {
    setChangeUserVisible(false);
  };

  return (
    <div className='header'>
      <div className='container'>
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
          <div className='user-profile-container-middlepages'>
            <div className='avatar-middlepage' onClick={toggleChangeUser}>
              <img src='/avatar.png' className='userprofileimg' alt='User Profile' />
            </div>
            {user ? ( // If the user is logged in, display user info and logout
              <div className='user-info'>
                <p>{user.email}</p>
                <button onClick={handleLogout}>Выйти</button>
              </div>
            ) : (
              // If the user is not logged in, display login and register links
              isChangeUserVisible && (
                <div className='change-user-popup'>
                  <Link to="/login" className='change-user-button'>
                    <p>Войти в профиль</p>
                  </Link>
                  <Link to="/register" className='change-user-button'>
                    <p>Зарегистрироваться</p>
                  </Link>
                  <button onClick={closeChangeUser}>Закрыть</button>
                </div>
              )
            )}
        </div>
        </div>
        <div className="questions-and-answers">
          <div className="questions">
            <p>Первый вопрос очень информативный</p>
            </div>
          <div className='answers'>
          <p>Первый ответ очень информативный</p>
          </div>
          <div className="questions">
          <p>Второй вопрос очень информативный</p>
            </div>
          <div className='answers'>
          <p>Второй ответ очень информативный</p>
          </div>
          <div className="questions">
          <p>Второй ответ очень информативный</p>
            </div>
          <div className='answers'>
          <p>Второй ответ очень информативный</p>
          </div>
          <div className="questions">
          <p>Второй ответ очень информативный</p>
            </div>
          <div className='answers'>
          <p>Второй ответ очень информативный</p>
          </div>
      </div>
      </div>
    </div>
  );
}

export default App;
