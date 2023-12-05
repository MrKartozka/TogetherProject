// notesService.js
import { query, where, getDocs, collection, addDoc, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { firestore } from './firebase';

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


const addNoteToFirestore = async (userId, title, text) => {
  const notesCollection = collection(firestore, 'notes');
  const date = new Date().toLocaleDateString();

  const docRef = await addDoc(notesCollection, {
    userId,
    title,
    text,
    date,
  });

  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    const data = docSnapshot.data();
    return {
      id: docSnapshot.id,
      title: data.title,
      text: data.text,
      date: data.date,
    };
  } else {
    return null;
  }
};


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

export {
  getNotesFromFirestore,
  getDeletedNotesFromFirestore,
  addNoteToFirestore,
  deleteNoteFromFirestore,
  restoreNoteFromTrash
};
