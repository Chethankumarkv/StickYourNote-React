

import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import MainContents from './components/mainBar';
import AddModal from './components/AddModal';
import EditModal from './components/EditModal';
import './css/App.css';

function App() {
    const [notes, setNotes] = useState([]);
    const [noteId, setNoteId] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState(null);
    const [showDeleted, setShowDeleted] = useState(false)
    const [showStar, setShowStar] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const notesFromStorage = JSON.parse(localStorage.getItem('stickyNotes')) || [];
        const id = notesFromStorage.length > 0 ? notesFromStorage[notesFromStorage.length - 1].id + 1 : 1;
        setNotes(notesFromStorage);
        setNoteId(id);
    }, []);


    
    const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase()); 
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const openEditModal = (note) => {
        setNoteToEdit(note);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setNoteToEdit(null);
        setShowEditModal(false);
    };
    const toggleShowDeleted = () => {
        setShowDeleted(!showDeleted)
    }

    const formatDate = (date) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Intl.DateTimeFormat('en-GB', options).format(date);
    };

    const handleAddNote = (title, stickynote) => {
        if (!title || !stickynote) {
            alert('Please enter both title and note text to continue.');
            return;
        }

        const newNote = {
            id: noteId,
            title: title,
            note: stickynote,
            star: false,
            date: formatDate(new Date()),
            deleted: false
        };

        const updatedNotes = [...notes, newNote];
        saveNotes(updatedNotes)

        setNoteId(prevNoteId => prevNoteId + 1);
        viewAllNotes();
        closeModal();

    };

    const handleEditNote = ({ id, title, note }) => {
        const updatedNotes = notes.map(existingNote => {
            if (existingNote.id === id) {
                return {
                    ...existingNote,
                    title: title,
                    note: note,
                    date: formatDate(new Date())
                };
            }
            return existingNote;
        });

        saveNotes(updatedNotes)
        closeEditModal();
    };
    const viewAllNotes = () => {
        setSearchTerm('')
        setShowDeleted(false)
        setShowStar(false)
    }
    const viewStarNotes = () => {
        setShowStar(true)
       
    }
    const saveNotes = (updatedNotes) => {
        setNotes(updatedNotes);
        localStorage.setItem('stickyNotes', JSON.stringify(updatedNotes));
    }
    const toggleDeleteStatus = (noteId) => {
        const updatedNotes = notes.map(note => {
            if (note.id === noteId) {
                return {
                    ...note,
                    deleted: !note.deleted
                }
            }
            return note;
        })
        return updatedNotes;
    }
    const handleDeleteNote = (noteId) => {
        if (confirmAction('Are you sure you want to  delete note ?')) {
        const updatedNotes = toggleDeleteStatus(noteId)
        saveNotes(updatedNotes)
    }
}
    const handleRestore = (noteId) => {
        const updatedNotes = toggleDeleteStatus(noteId)
        saveNotes(updatedNotes)
    }
    const handleClearAll = () => {
        if (confirmAction('Are you sure you want to clear all  notes?')) {
        const updatedNotes = notes.map(note => {
            return {
                ...note,
                deleted: true
            }
        })
        saveNotes(updatedNotes)
    }
    }
    const confirmAction = (message) => {
        return window.confirm(message);
    };
    const handleClearRecycleBin =()=>{
        if (confirmAction('Are you sure you want to clear all deleted notes?')) {
        const updatedNotes = notes.filter(note=> note.deleted !== true)
        saveNotes(updatedNotes)
        }
    }

    const handleStarClick = (noteId) => {
        const updatedNotes = notes.map(note => {
            if (note.id === noteId) {
                return {
                    ...note,
                    star: !note.star
                }
            }
            return note;
        })
        saveNotes(updatedNotes)

    }
 
    return (
        <div className="App">
            <Navbar onSearch={handleSearch} />
            <div className="MainContainer">
                <Sidebar openAddModal={openModal} toggleShowDeleted={toggleShowDeleted} viewAllNotes={viewAllNotes} viewStarNotes={viewStarNotes} handleClearAll={handleClearAll} handleClearRecycleBin={handleClearRecycleBin} />
                <MainContents notes={notes} openEditModal={openEditModal} onDeleteNote={handleDeleteNote} handleRestore={handleRestore} showDeleted={showDeleted} handleStar={handleStarClick} showStar={showStar} searchTerm={searchTerm} />
                <AddModal showModal={showModal} closeModal={closeModal} handleAddNote={handleAddNote} />
                <EditModal showModal={showEditModal} closeModal={closeEditModal} noteToEdit={noteToEdit} handleEditNote={handleEditNote} />
            </div>
        </div>
    );
}

export default App;




