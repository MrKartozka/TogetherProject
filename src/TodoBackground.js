import React, { useState, useEffect } from 'react';
import './Сheckbox.css';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import './TodoBackground.css';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from './firebase';

// Компонент для изменения и сохранения настроек фона
function TodoBackground() {
  const [isBackgroundModalVisible, setBackgroundModalVisible] = useState(false);
  const [backgrounds, setBackgrounds] = useState([
    'onebackground.png',
    'secondbackground.png',
    'thirdbackground.png',
    'fourbackground.png',
    'fivebackground.png',
    'sixbackground.png',
    'sevenbackground.png',
    'eightbackground.png',
    'ninebackground.png',
  ]);
  const [selectedBackground, setSelectedBackground] = useState('/public/onebackground.png');
  const [previewBackground, setPreviewBackground] = useState(selectedBackground);
  const [userProfileImage, setUserProfileImage] = useState('/avatar.png');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const loggedInUser = JSON.parse(storedUser);
      setUser(loggedInUser);
      if (loggedInUser.photoURL) {
        setUserProfileImage(loggedInUser.photoURL);
      }
    }

    const storedBackground = localStorage.getItem('selectedBackground');
    if (storedBackground) {
      setSelectedBackground(storedBackground);
      document.body.style.backgroundImage = `url(${storedBackground})`;
      setPreviewBackground(storedBackground);
    }
  }, []);

  // Обработчики для открытия/закрытия модели выбора фона
  const openBackgroundModal = () => {
    setBackgroundModalVisible(true);
  };

  const closeBackgroundModal = () => {
    setBackgroundModalVisible(false);
  };

  // Обработать выбор фона и сохранить
  const handleBackgroundSelection = (background) => {
    setPreviewBackground(background);
    document.body.style.backgroundImage = `url(${background})`;
  };

  const handleSaveBackground = async () => {
    setSelectedBackground(previewBackground);
    localStorage.setItem('selectedBackground', previewBackground);
    closeBackgroundModal();
  
    if (user) {
      const userRef = doc(firestore, 'users', user.id);
      await setDoc(userRef, { selectedBackground: previewBackground }, { merge: true });
    }
  };

  // Отменить изменение фона
  const handleCancel = () => {
    setPreviewBackground(selectedBackground);
    document.body.style.backgroundImage = `url(${selectedBackground})`;
    closeBackgroundModal();
  };

  const [value, setValue] = useState('');
  const [isChangeUserVisible, setChangeUserVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setUserProfileImage('/avatar.png');
    navigate('/login');
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
    <div className="header">
      <div className="container">
        <div className="navbar">
          <div className="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label className="menu__btn" htmlFor="menu__toggle">
              <span></span>
            </label>
            <ul className="menu__box">
              <Link to="/" className="mainpage-button">
                <li>
                  <span className="menu__item">
                    <img src="/notes.png" alt="Note Icon" className="icon" />
                    Заметки
                  </span>
                </li>
              </Link>
              <li>
                <span className="menu__item">
                  <img src="/backstyle.png" alt="Note Icon" className="icon" />
                  <span>Фон</span>
                </span>
              </li>
              <Link to="/TodoBacket" className="backet-button">
                <li>
                  <span className="menu__item">
                    <img src="/trash.png" alt="Note Icon" className="icon" />
                    Корзина
                  </span>
                </li>
              </Link>
              <Link to="/TodoInfo" className="info-button">
                <li>
                  <span className="menu__item aboutnote">
                    <img src="/helpful.png" alt="Note Icon" className="icon" />
                    Справка
                  </span>
                </li>
              </Link>
            </ul>
          </div>
          <div className='user-profile-container-middlepages'>
          <div className='avatar' onClick={toggleChangeUser}>
          <img src={user ? userProfileImage : '/avatar.png'} className='userprofileimg' alt='User Profile' />
        </div>
        {isChangeUserVisible && (
          user ? (
              <div className='user-info'>
                <p>{user.email}</p>
                <button onClick={handleLogout}>Выйти</button>
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
            ))}
          </div>
        </div>
        <div className="background-list">
          <img
            onClick={openBackgroundModal}
            src="/selectbackground.png"
            alt=""
          ></img>
          <button onClick={openBackgroundModal}>Выбрать фон</button>
        </div>
        {isBackgroundModalVisible && (
          <div className="background-modal">
            <div className="background-options">
              {backgrounds.map((background, index) => (
                <div key={index} className="background-option-container">
                  <img
                    src={background}
                    alt={`Background ${index + 1}`}
                    onClick={() => handleBackgroundSelection(background)}
                    className={
                      previewBackground === background
                        ? 'background-option selected'
                        : 'background-option'
                    }
                  />
                </div>
              ))}
            </div>
            <div className='background-options-buttons'>
              <button id='backgroundsavebutton' onClick={handleSaveBackground}>Сохранить</button>
              <button id='backgroundundobutton' onClick={handleCancel}>Отмена</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoBackground;
