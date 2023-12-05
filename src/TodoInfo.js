import React, { useState, useEffect } from 'react';
import './Сheckbox.css';
import './App.css';
import './TodoInfo.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function FAQItem({ question, answer }) {
  const [isActive, setIsActive] = useState(false);

  const toggleAnswer = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="questions-and-answers">
      <div className="question" onClick={toggleAnswer}>
        {isActive ? '▼' : '▽'} {question} {isActive ? '▼' : '▽'}
      </div>
      {isActive && (
        <div className="answer active">
          {answer}
        </div>
      )}
    </div>
  );
}

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
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // const handleChange = (event) => {
  //   setValue(event.target.value);
  // };

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
            {user ? (
              <div className='user-info'>
                <p>{user.email}</p>
                <Link to="/login">
                  <button onClick={handleLogout}>Выйти</button>
                </Link>
              </div>
            ) : (
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
        <div className='faq-box'>
          <div className="questions-and-answers">
            <FAQItem
              question="Почему именно мы?"
              answer="Наш сайт обладает уникальным функционалом, который облегчит вам жизнь"
            />
            <FAQItem
              question="Для кого подойдет наш сайт?"
              answer="Вы можете использовать заметки для всего! От важных дел до рутинной работы"
            />
            <FAQItem
              question="Что нельзя писать в заметках?"
              answer="Никаких ограничений нет, соблюдайте лишь правила интернета"
            />
            <FAQItem
              question="Сколько это стоит?"
              answer="Абсолютно Б Е С П Л А Т Н О"
            />
            <FAQItem
              question="Будут ли обновления фукнционала?"
              answer="Да, в ближайшем будущем!"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
