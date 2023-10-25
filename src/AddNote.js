import { useState } from 'react';
import './Note.css';

const AddNote = ({ handleAddNote }) => {
	const [noteText, setNoteText] = useState('');
	const characterLimit = 1000;
	const [title, setTitle] = useState('');

	const handleChange = (event) => {
		if (characterLimit - event.target.value.length >= 0) {
			setNoteText(event.target.value);
		}
	};

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	}

	const handleSaveClick = () => {
		if (title.trim().length > 0 || noteText.trim().length > 0) {
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
			onChange={handleTitleChange}
			/>
			<textarea
				rows='12'
				cols='20'
				placeholder='Добавить заметку..'
				value={noteText}
				onChange={handleChange}
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