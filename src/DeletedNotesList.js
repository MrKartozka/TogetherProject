import React from 'react';
import Note from './Note';

// Компонент для отображения списка удаленных заметок
const DeletedNotesList = ({ deletedNotes, handleDeleteNote, handleRestoreNote, setDeletedNotes }) => {
  return (
    <div className="notes-list">
      {deletedNotes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          text={note.text}
          date={note.date}
          handleDeleteNote={() => {
            handleDeleteNote(note.id);
            setDeletedNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));
          }}
          handleRestoreNote={() => {
            handleRestoreNote(note.id);
            setDeletedNotes((prevNotes) => prevNotes.filter((n) => n.id !== note.id));
          }}
          isDeleted={true}
        />
      ))}
    </div>
  );
};

export default DeletedNotesList;
