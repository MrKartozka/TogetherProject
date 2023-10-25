import { MdDeleteForever } from 'react-icons/md';
import './Note.css';

const Note = ({ 
    id,
    title, 
    text, 
    date, 
    handleDeleteNote 
}) => {
    return (
        <div className='note'>
            <div className='note-content'>
                <h2>{title}</h2>
                <span className='note-text'>{text}</span> {/* Add the note-text class here */}
            </div>
            <div className='note-footer'>
                <small>{date}</small>
                <MdDeleteForever
                    onClick={() => handleDeleteNote(id)}
                    className='delete-icon'
                    size='1.3em'
                />
            </div>
        </div>
    );
};

export default Note;
