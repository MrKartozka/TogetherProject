import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import './Note.css';

const Note = ({ id, title, text, date, handleDeleteNote, handleRestoreNote, isDeleted }) => {
    console.log('Rendering note:', { id, title, text, date });
    return (
        <div className='note'>
            <div className='note-content'>
                <h2>{title}</h2>
                <span className='note-text'>{text}</span>
            </div>
            <div className='note-footer'>
                <small>{date}</small>
                {isDeleted ? (
                    <div className='note-footer-box'>
                        <button className='restore-button' onClick={() => handleRestoreNote(id)}>
                            Восстановить
                        </button>
                        <MdDeleteForever
                            onClick={() => handleDeleteNote(id)}
                            className='delete-icon'
                            size='1.3em'
                        />
                    </div>
                ) : (
                    <MdDeleteForever
                        onClick={() => handleDeleteNote(id)}
                        className='delete-icon'
                        size='1.3em'
                    />
                )}
            </div>
        </div>
    );
};

export default Note;

