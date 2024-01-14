// Сервисные функции для взаимодействия с Firestore для управления заметками (этот файл)
import { query, where, getDocs, collection, addDoc, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from './firebase';

// Извлечение активных заметок из Firestore
const getNotesFromFirestore = async (userId) => {
  const notesCollection = collection(firestore, 'notes');
  const q = query(notesCollection, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  const notes = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    notes.push({
      id: doc.id,
      title: data.title,
      text: data.text,
      date: data.date,
    });
  });
  console.log("Fetched notes:", notes);
  return notes;
};

// Извлечение удаленных заметок из Firestore
const getDeletedNotesFromFirestore = async (userId) => {
  const deletedNotesCollection = collection(firestore, 'deletedNotes');
  const q = query(deletedNotesCollection, where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  const deletedNotes = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    deletedNotes.push({
      id: doc.id,
      userId: data.userId,
      title: data.title,
      text: data.text,
      date: data.date,
    });
  });
  console.log("Fetched deleted notes:", deletedNotes);
  return deletedNotes;
};

// Добавление новой заметки в Firestore
const addNoteToFirestore = async (userId, title, text, maxNotes) => {
  const activeNotes = await getNotesFromFirestore(userId);
  const deletedNotes = await getDeletedNotesFromFirestore(userId);

  if (activeNotes.length + deletedNotes.length < maxNotes) {
    const date = new Date().toLocaleDateString();
    const docRef = await addDoc(collection(firestore, 'notes'), {
        userId,
        title,
        text,
        date,
    });

    return {
        id: docRef.id,
        title,
        text,
        date,
    };
} else {
    console.error("Cannot add more notes. Limit reached.");
    return null;
}
};

// Переместить заметку в коллекцию удаленных заметок в Firestore
const deleteNoteFromFirestore = async (userId, noteId) => {
  const notesCollection = collection(firestore, 'notes');
  const deletedNotesCollection = collection(firestore, 'deletedNotes');
  const noteRef = doc(notesCollection, noteId);

  try {
    const noteSnapshot = await getDoc(noteRef);
    if (noteSnapshot.exists()) {
      const noteData = noteSnapshot.data();
      await addDoc(deletedNotesCollection, {
        userId,
        title: noteData.title,
        text: noteData.text,
        date: noteData.date,
      });
      await deleteDoc(noteRef);
      console.log('Note moved to the trash successfully');
    }
  } catch (error) {
    console.error('Error moving note to the trash:', error);
  }
};

// Восстановить заметку из коллекции удаленных заметок в Firestore
const restoreNoteFromTrash = async (userId, noteId) => {
  const notesCollection = collection(firestore, 'notes');
  const deletedNotesCollection = collection(firestore, 'deletedNotes');
  const noteRef = doc(deletedNotesCollection, noteId);

  try {
    const noteSnapshot = await getDoc(noteRef);
    if (noteSnapshot.exists()) {
      const noteData = noteSnapshot.data();
      await addDoc(notesCollection, {
        userId,
        title: noteData.title,
        text: noteData.text,
        date: noteData.date,
      });
      await deleteDoc(noteRef);
      console.log('Note restored successfully');
    }
  } catch (error) {
    console.error('Error restoring note:', error);
  }
};

// Обновить существующую заметку в Firestore
const updateNoteInFirestore = async (noteId, updatedNote) => {
  const notesCollection = collection(firestore, 'notes');
  const noteRef = doc(notesCollection, noteId);

  try {
    await setDoc(noteRef, updatedNote);
    console.log('Note updated successfully');
  } catch (error) {
    console.error('Error updating note:', error);
  }
};


export {
  getNotesFromFirestore,
  getDeletedNotesFromFirestore,
  addNoteToFirestore,
  deleteNoteFromFirestore,
  restoreNoteFromTrash,
  updateNoteInFirestore
};
