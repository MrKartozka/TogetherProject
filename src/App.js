import React, { useState, useEffect } from 'react';
import './Сheckbox.css';
import './App.css';
import './Note.css';
import TodoBackground from './TodoBackground';
import TodoBacket from './TodoBacket';
import TodoInfo from './TodoInfo';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { nanoid } from 'nanoid';
import NoteList from './NoteList';
import { getNotesFromFirestore, addNoteToFirestore, deleteNoteFromFirestore, restoreNoteFromTrash, updateNoteInFirestore, getDeletedNotesFromFirestore } from './notesService';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from './firebase';

// Основной компонент приложения
function App() {
  const [searchText, setSearchText] = useState('');
  const [user, setUser] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState('/public/onebackground.png');
  const [previewBackground, setPreviewBackground] = useState(selectedBackground);
  const [notes, setNotes] = useState([]);
  const [userProfileImage, setUserProfileImage] = useState('/avatar.png');
  const [isChangeUserVisible, setChangeUserVisible] = useState(false);
  const navigate = useNavigate();
  const [deletedNotes, setDeletedNotes] = useState([]);
  const maxNotes = 10;

  // Извлекает пользовательские данные из localStorage при монтировании компонента
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const loggedInUser = JSON.parse(storedUser);
      setUser(loggedInUser);
      if (loggedInUser.photoURL) {
        setUserProfileImage(loggedInUser.photoURL);
      }
      fetchUserBackground(loggedInUser.id);
    }

    const storedBackground = localStorage.getItem('selectedBackground');
    if (storedBackground) {
      setSelectedBackground(storedBackground);
      document.body.style.backgroundImage = `url(${storedBackground})`;
      setPreviewBackground(storedBackground);
    }

    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Сохраняет заметки в localStorage всякий раз, когда они меняются
  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes]);

  // Извлекает активные и удаленные заметки из Firestore
  useEffect(() => {
    if (user) {
      const fetchNotes = async () => {
        const activeNotes = await getNotesFromFirestore(user.id);
        const trashedNotes = await getDeletedNotesFromFirestore(user.id);
        setNotes(activeNotes);
        setDeletedNotes(trashedNotes);
      };

      fetchNotes().catch(console.error);
    }
  }, [user]);
  
  // Создает новую заметку и добавляет ее в Firestore
  const handleCreateNote = async (title, text) => {
    if (notes.length + deletedNotes.length < maxNotes) {
      const newNote = await addNoteToFirestore(user.id, title, text, maxNotes);
      if (newNote) {
        setNotes([...notes, newNote]);
      }
    } else {
      console.error("Cannot add more notes. Limit reached.");
    }
  };

  // Добавление заметки
  const addNote = async (text, title) => {
    const newNote = await handleCreateNote(title, text);
    if (newNote) {
        setNotes([...notes, newNote]);
    } else {
        console.error("Failed to add note or limit reached.");
    }
};

  // Удаление заметки
  const deleteNote = (id) => {
    if (user) {
      const noteToDelete = notes.find((note) => note.id === id);
      if (noteToDelete) {
        deleteNoteFromFirestore(user.id, id)
          .then(() => {
            const newNotes = notes.filter((note) => note.id !== id);
            setNotes(newNotes);
            console.log('Note deleted successfully');
          })
          .catch((error) => {
            console.error('Error deleting note from Firestore:', error);
          });
      }
    }
  };

  // Переключение видимости профиля пользователя
  const toggleChangeUser = () => {
    setChangeUserVisible(!isChangeUserVisible);
  };

  // Закрыть всплывающее окно профиля пользователя
  const closeChangeUser = () => {
    setChangeUserVisible(false);
  };

  // Обработчик выхода из системы
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setUserProfileImage('/avatar.png');
    navigate('/login');
  };
  
  // Примечание об обновлении заметки в Firestore
  const handleUpdateNote = async (id, title, text) => {
    if (user) {
      const updatedNote = { userId: user.id, title, text, date: new Date().toLocaleDateString() };
      await updateNoteInFirestore(id, updatedNote);
      setNotes(notes.map(note => note.id === id ? { ...note, title, text } : note));
    }
  };

  // Получить фоновое изображение пользователя из Firestore
  const fetchUserBackground = async (userId) => {
    const userRef = doc(firestore, 'users', userId);
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists() && docSnap.data().selectedBackground) {
        const userBackground = docSnap.data().selectedBackground;
        document.body.style.backgroundImage = `url(${userBackground})`;
        setSelectedBackground(userBackground);
      }
    } catch (error) {
      console.error('Error fetching user background:', error);
    }
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
                onChange={(event) => setSearchText(event.target.value)}
              />
            </form>
          </div>
          <div className='user-profile-container'>
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
        <div className='note-container'>
          <NoteList
            notes={notes.filter((note) =>
              typeof note.text === 'string' && note.title.toLowerCase().includes(searchText)
            )}
            handleAddNote={addNote}
            handleDeleteNote={deleteNote}
            handleUpdateNote={handleUpdateNote}
            maxNotes={maxNotes}
            deletedNotesCount={deletedNotes.length}
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
