import { useState } from 'react';
import './Note.css';

const AddNote = ({ handleAddNote }) => {
	const [noteText, setNoteText] = useState('');
	const characterLimit = 1000;
	// const titleCharLimit = 30;
	const [title, setTitle] = useState('');

	// const handleChange = (event) => {
	// 	if (characterLimit - event.target.value.length >= 0) {
	// 		setNoteText(event.target.value);
	// 	}
	// };

	// const handleTitleChange = (event) => {
	// 	if (titleCharLimit - event.target.value.length >= 0) {
	// 		setTitle(event.target.value);

	// 	}
	// }

	const handleSaveClick = () => {
    if (title.trim().length > 0 || noteText.trim().length > 0) {
        console.log('Saving note:', { title, noteText });
        handleAddNote(noteText, title);
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
				onChange={(event) => setTitle(event.target.value)}
			/>
			<textarea
				rows='120'
				cols='200'
				placeholder='Добавить заметку..'
				value={noteText}
				onChange={(event) => setNoteText(event.target.value)}
			/>
			<div className='note-footer'>
				<small>
					{characterLimit - noteText.length} Осталось
				</small>
				<button className='save' onClick={handleSaveClick}>
					Сохранить
				</button>
			</div>
		</div>
	);
};

export default AddNote;
