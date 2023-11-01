import Note from './Note';
import AddNote from './AddNote';
import './Note.css';
import { format, isValid } from 'date-fns';

const NotesList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
}) => {
  return (
    <div className='notes-list'>
      {notes.map((note) => {
        const date = new Date(note.date);
        if (isValid(date)) {
          return (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              text={note.text}
              date={format(date, 'dd.MM.yyyy')}
              handleDeleteNote={handleDeleteNote}
            />
          );
        }
        return null; // Опционально, можно игнорировать недопустимые даты
      })}
      <AddNote handleAddNote={handleAddNote} />
    </div>
  );
};

export default NotesList;