// notesService.js
import { query, where, getDocs, collection, addDoc } from 'firebase/firestore';
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
      // Add any other fields you need
    });
  });
  console.log("Fetched notes:", notes);
  return notes;
};

const addNoteToFirestore = async (userId, title, text) => {
  const notesCollection = collection(firestore, 'notes');
  const date = new Date().toLocaleDateString();
  await addDoc(notesCollection, {
    userId,
    title,
    text,
    date,
    // Add any other fields you need
  });
};

export { getNotesFromFirestore, addNoteToFirestore };
