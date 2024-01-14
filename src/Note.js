import React, { useState } from 'react';
import { MdDeleteForever, MdEdit, MdSave } from 'react-icons/md';
import './Note.css';

const Note = ({ id, title, text, date, handleDeleteNote, handleRestoreNote, handleUpdateNote, isDeleted }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedText, setEditedText] = useState(text);

    const saveEditedNote = () => {
        handleUpdateNote(id, editedTitle, editedText);
        setEditMode(false);
    };

    const titleCharLimit = 30;
    const textCharLimit = 1000;

    const handleTitleChange = (e) => {
        if (e.target.value.length <= titleCharLimit) {
            setEditedTitle(e.target.value);
        }
    };
    
    const handleTextChange = (e) => {
        if (e.target.value.length <= textCharLimit) {
            setEditedText(e.target.value);
        }
    };
    
    return (
        <div className={`note ${editMode ? 'edit-mode' : ''}`}>
            <div className='note-content'>
                {editMode ? (
                    <>
                        <input 
                            type="text" 
                            value={editedTitle} 
                            onChange={handleTitleChange} 
                            maxLength={16}
                        />
                        <textarea className='edit-textarea'
                            rows='14'
                            cols='35'
                            value={editedText} 
                            onChange={handleTextChange}
                        />
                    </>
                ) : (
                    <>
                        <h2>{title}</h2>
                        <span className='note-text'>{text}</span>
                    </>
                )}
            </div>
            <div className='note-footer'>
                <small>{date}</small>
                {isDeleted ? (
                    <div className='note-footer-box'>
                        <button className='restore-button' onClick={() => handleRestoreNote(id)}>
                            Восстановить
                        </button>
                        <MdDeleteForever onClick={() => handleDeleteNote(id)} className='delete-icon' size='1.3em' />
                    </div>
                ) : (
                    <div className='note-footer-box'>
                        {editMode ? (
                            <MdSave onClick={saveEditedNote} className='save-icon' size='1.3em' />
                        ) : (
                            <MdEdit onClick={() => setEditMode(true)} className='edit-icon' size='1.3em' />
                        )}
                        <MdDeleteForever onClick={() => handleDeleteNote(id)} className='delete-icon' size='1.3em' />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Note;
