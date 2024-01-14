import Note from './Note';
import AddNote from './AddNote';
import './Note.css';
import { format, parseISO, isValid } from 'date-fns';

// Компонент для отображения списка заметок
const NotesList = ({ notes, handleAddNote, handleDeleteNote, handleUpdateNote, maxNotes, deletedNotesCount }) => {
  return (
    <div className='notes-list'>
      {notes.map((note) => {
        let formattedDate = note.date;
        try {
          const parsedDate = parseISO(note.date);
          if (isValid(parsedDate)) {
            formattedDate = format(parsedDate, 'dd.MM.yyyy');
          }
        } catch (error) {
          console.error('Error formatting date:', error);
        }
        return (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            text={note.text}
            date={formattedDate}
            handleDeleteNote={handleDeleteNote}
            handleUpdateNote={handleUpdateNote}
          />
        );
      })}
      {(notes.length + deletedNotesCount) < maxNotes && <AddNote handleAddNote={handleAddNote} />}
    </div>
  );
};

export default NotesList;
