import React, { useState, useEffect } from 'react';
import './Сheckbox.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { getDeletedNotesFromFirestore, restoreNoteFromTrash } from './notesService';
import DeletedNotesList from './DeletedNotesList';
import { query, where, getDocs, collection, addDoc, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from './firebase';

function TodoBacket() {
  const [searchText, setSearchText] = useState('');
  const [value, setValue] = useState('');
  const [isChangeUserVisible, setChangeUserVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState('/public/onebackground.png');
  const [previewBackground, setPreviewBackground] = useState(selectedBackground);
  const [deletedNotes, setDeletedNotes] = useState([]);

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

  useEffect(() => {
    if (user) {
      getDeletedNotesFromFirestore(user.id)
        .then((notes) => {
          setDeletedNotes(notes);
        })
        .catch((error) => {
          console.error("Error fetching deleted notes from Firestore:", error);
        });
    }
  }, [user]);


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

  const deleteNoteFromTrash = async (noteId) => {
    if (user) {
      try {
        const deletedNotesCollection = collection(firestore, 'deletedNotes');
        const noteRef = doc(deletedNotesCollection, noteId);
        await deleteDoc(noteRef);
        console.log('Note deleted from trash successfully');
        return true;
      } catch (error) {
        console.error('Error deleting note from trash:', error);
        return false;
      }
    }
    return false;
  };
  
  const handleDeleteConfirmation = async (noteId) => {
    const shouldDelete = window.confirm("Do you want to delete this note from the trash?");
    console.log('Deletion choice made:', shouldDelete);
  
    if (!shouldDelete) {
      console.log('Deletion cancelled');
      return;
    }
  
    try {
      await deleteNoteFromTrash(noteId);
      console.log('Deleting note with ID:', noteId);
      setDeletedNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting note from trash:', error);
    }
  };
  
  const handleRestoreNote = async (noteId) => {
    restoreNoteFromTrash(user.id, noteId)
      .then(() => {
        setDeletedNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
        console.log('Note restored successfully');
      })
      .catch((error) => {
        console.error('Error restoring note:', error);
      });
  };

  const getFilteredDeletedNotes = () => {
    return searchText 
      ? deletedNotes.filter(note => 
          note.title.toLowerCase().includes(searchText.toLowerCase()) || 
          note.text.toLowerCase().includes(searchText.toLowerCase())
        ) 
      : deletedNotes;
  };

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
        <div className='searchline'>
            <form className='searchform'>
              <input
                type='text'
                placeholder='Поиск удалённой заметки'
                className='search_input'
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
              />
            </form>
          </div>
        <div className='user-profile-container'>
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
      <div className='note-container'>
          <DeletedNotesList 
            deletedNotes={getFilteredDeletedNotes()}
            handleDeleteNote={handleDeleteConfirmation}
            handleRestoreNote={handleRestoreNote}
            setDeletedNotes={setDeletedNotes}
          />
      </div>
    </div>
  );
}

export default TodoBacket;

