import React, { useState, useEffect } from 'react';
import './Сheckbox.css';
import './App.css';
import TodoBackground from './TodoBackground';
import TodoBacket from './TodoBacket';
import TodoInfo from './TodoInfo';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useSelector, useDispatch } from 'react-redux'; // Add imports
import { setUser, removeUser } from './store/slices/userSlice';
import { useNavigate } from 'react-router-dom';


function App() {
  const [value, setValue] = useState('');
  const [isChangeUserVisible, setChangeUserVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
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
              <li>
                <span className='menu__item'>
                <img src='notes.png' alt='Note Icon' className='icon'></img>
                Заметки
                </span>
              </li>
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
          <div className='searchline'>
            <form className='searchform'>
                <input
                  type='text'
                  placeholder='Поиск заметки'
                  className='search_input'
                  value={value}
                  onChange={handleChange}
                />
            </form>
          </div>
          <div className='addbutton'>
            <button><img src='/addbutton.png'></img></button>
          </div>
          <div className='user-profile-container'>
          <div className='avatar' onClick={toggleChangeUser}>
              <img src='/avatar.png' className='userprofileimg' alt='User Profile' />
            </div>
            {user ? ( // If the user is logged in, display user info and logout
              <div className='user-info'>
                <p>{user.email}</p>
                <button onClick={handleLogout}>Logout</button>
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
      </div>
    </div>
  );
}

function AppRouter() {
  return (
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/TodoBackground" element={<TodoBackground />} />
        <Route path="/TodoInfo" element={<TodoInfo />} />
        <Route path="/TodoBacket" element={<TodoBacket />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
  );
}

export default AppRouter;
