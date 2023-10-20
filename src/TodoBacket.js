import React, { useState } from 'react';
import './Сheckbox.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
  const [value, setValue] = useState('');
  const [isChangeUserVisible, setChangeUserVisible] = useState(false);

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
                <span className='menu__item'>
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
          {isChangeUserVisible && (
            <div className='change-user-popup'>
              <Link to="#" className='change-user-button'><p>Сменить пользователя</p></Link>
              <button onClick={closeChangeUser}>Закрыть</button>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
