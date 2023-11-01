import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import './Note.css';
import { firestore } from './firebase';

const AddNote = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState('');
  const characterLimit = 1000;
  const titleCharLimit = 30;
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState([]); // Состояние для хранения списка заметок
  const maxNotes = 20; // Ограничение на количество заметок

  const handleChange = (event) => {
    if (characterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value);
    }
  };

  const handleTitleChange = (event) => {
    if (titleCharLimit - event.target.value.length >= 0) {
      setTitle(event.target.value);
    }
  };

  const handleSaveClick = () => {
    if (title.trim().length > 0 || noteText.trim().length > 0) {
      if (notes.length < maxNotes) { // Проверяем, что не достигнут лимит заметок
        handleAddNote(noteText, title);
        // Добавляем новую заметку в состояние
        setNotes([...notes, { title, text: noteText }]);
      } else {
        alert('Достигнут лимит заметок.'); // Можно использовать другой способ уведомления
      }
      setTitle('');
      setNoteText('');
    }
  };

  return (
    <div className='note new'>
      <input
        type='text'
        value={title}
        placeholder='Название...'
        onChange={handleTitleChange}
      />
      <textarea
        rows='120' // Уменьшил количество строк для тестового примера
        cols='200'
        placeholder='Добавить заметку..'
        value={noteText}
        onChange={handleChange}
      />
      <div className='note-footer'>
        <small>{characterLimit - noteText.length} Осталось</small>
        <button
          className='save'
          onClick={handleSaveClick}
          disabled={notes.length >= maxNotes}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default AddNote;