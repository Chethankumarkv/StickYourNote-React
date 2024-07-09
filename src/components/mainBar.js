import React from 'react';
import ImageStar from '../Images/starLogo.png';
import '../css/App.css';

const MainContents = ({ notes, openEditModal, onDeleteNote, showDeleted, handleRestore, handleStar, showStar, searchTerm }) => {
    const renderNotes = () => {
        return notes.map(note => {
         
            if (!note.deleted && !showStar && (note.title.toLowerCase().includes(searchTerm)||note.note.toLowerCase().includes(searchTerm))) {
                return renderNoteItem(note);
            }
          
            else if (!note.deleted && showStar && note.star && (note.title.toLowerCase().includes(searchTerm)||note.note.toLowerCase().includes(searchTerm))) {
                return renderNoteItem(note);
            }
            return null;
        });
    };

    const renderDeletedNotes = () => {
        return notes.map(note => {
           
            if (note.deleted) {
                return renderDeletedNoteItem(note);
            }
            return null;
        });
    };

    const renderNoteItem = (note) => {
        return (
            <div key={`note-${note.id}`} className={`sticky ${note.star ? 'starred' : ''}`} id={`note-${note.id}`} data-note-id={note.id}>
                <div className="content">
                    <h3 className="sticky-title">Title: {note.title}</h3>
                    <p>Note: {note.note}</p>
                </div>
                <div className="date">
                    <span>{note.date}</span>
                </div>
                <div className="star-icon">
                    <img className="star" src={ImageStar} onClick={() => handleStar(note.id)} alt="Star Icon" />
                </div>
                <div className="sticky-buttons">
                    <button className="edit-button" onClick={() => openEditModal(note)}>Edit</button>
                    {showDeleted ? (
                        <button className="restore" onClick={() => handleRestore(note.id)}>Restore</button>
                    ) : (
                        <button className="delete-button" onClick={() => onDeleteNote(note.id)}>Delete</button>
                    )}
                </div>
            </div>
        );
    };

    const renderDeletedNoteItem = (note) => {
        return (
            <div key={`note-${note.id}`} className="sticky" id={`note-${note.id}`} data-note-id={note.id}>
                <div className="content">
                    <h3 className="sticky-title">Title: {note.title}</h3>
                    <p>Note: {note.note}</p>
                </div>
                <div className="date">
                    <span>{note.date}</span>
                </div>
                <div className="sticky-buttons">
                    <button className="restore" onClick={() => handleRestore(note.id)}>Restore</button>
                </div>
            </div>
        );
    };

    return (
        <div className="mainBar">
            <h2>Welcome to Sticky Notes App 📝</h2>
            <div id="sticky-notes">
                {showDeleted ? renderDeletedNotes() : renderNotes()}
            </div>
        </div>
    );
};

export default MainContents;
