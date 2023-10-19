import React, { useState } from 'react';
import './Сheckbox.css';
import './App.css';

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
              <li>
                <a className='menu__item' href='#'>
                <img src='notes.png' alt='Note Icon' className='icon'></img>
                Заметки
                </a>
              </li>
              <li>
                <a className='menu__item' href='#'>
                <img src='/backstyle.png' alt='Note Icon' className='icon'></img>
                Стиль
                </a>
              </li>
              <li>
                <a className='menu__item' href='#'>
                <img src='/trash.png' alt='Note Icon' className='icon'></img>
                Корзина
                </a>
              </li>
              <li>
                <a className='menu__item' href='#'>
                <img src='/helpful.png' alt='Note Icon' className='icon'></img>
                Справка
                </a>
              </li>
            </ul>
          </div>
          <div className='searchline'>
            <form className='searchform'>
                <input
                  type='text'
                  placeholder='Меня в школе пиздят'
                  className='search_input'
                  value={value}
                  onChange={handleChange}
                />
            </form>
          </div>
          <div className='addbutton'>
            <img src='/addbutton.png'></img>
          </div>
          <div className='user-profile-container'>
            <div className='avatar' onClick={toggleChangeUser}>
              <img src='/avatar.png' className='userprofileimg' alt='User Profile' />
            </div>
          {isChangeUserVisible && (
            <div className='change-user-popup'>
              <p>Сменить пользователя</p>
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
