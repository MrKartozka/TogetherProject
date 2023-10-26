import React, { useState, useEffect } from 'react';
import './Сheckbox.css';
import './App.css';
import './Note.css';
import TodoBackground from './TodoBackground';
import TodoBacket from './TodoBacket';
import TodoInfo from './TodoInfo';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useSelector, useDispatch } from 'react-redux'; // Add imports
import { nanoid } from 'nanoid';
import NoteList from './NoteList';
import AddNote from './AddNote';



function App() {
  const [value, setValue] = useState('');
  const [isChangeUserVisible, setChangeUserVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState('/public/onebackground.png');
  const [previewBackground, setPreviewBackground] = useState(selectedBackground); 

  useEffect(() => {
    // Check local storage for the user's login status
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  useEffect(() => {
    // Check local storage for the selected background image
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
  setSearchText(event.target.value);
};


  const toggleChangeUser = () => {
    setChangeUserVisible(!isChangeUserVisible);
  };

  const closeChangeUser = () => {
    setChangeUserVisible(false);
  };

{/*--------------Below---------------------  */}

const [notes, setNotes] = useState([]);

const [searchText, setSearchText] = useState('');

	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

	const addNote = (text, title) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
      title: title,
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};


  const [isBlockVisible, setBlockVisibility] = useState(false);

  const toggleBlock = () => {
    setBlockVisibility(!isBlockVisible);
  };

  
{/*--------------Above---------------------  */}
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
                <span className='menu__item aboutnote'>
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
                  value={searchText}
                  onChange={handleChange}
                />
            </form>
          </div>
          <div className='user-profile-container'>
            <div className='avatar' onClick={toggleChangeUser}>
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
        <div className='note-container'>
  <NoteList
    notes={notes.filter((note) =>
      typeof note.text === 'string' && note.title.toLowerCase().includes(searchText)
    )}
    handleAddNote={addNote}
    handleDeleteNote={deleteNote}
  />
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
