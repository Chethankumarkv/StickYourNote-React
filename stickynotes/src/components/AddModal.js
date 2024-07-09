import React, { useState } from 'react';
import '../css/App.css';

const AddModal = ({ showModal, closeModal, handleAddNote }) => {
    const [title, setTitle] = useState('');
    const [stickynote, setStickyNote] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddNote(title, stickynote);
        setTitle(''); 
        setStickyNote('');
    };

    return (
        <div id="addModal" className={`modal ${showModal ? '' : 'hidden'}`}>
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Add Sticky Note</h2>
                
                    <input
                       id='note-title'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        required
                    />
                    <textarea
                        value={stickynote}
                        onChange={(e) => setStickyNote(e.target.value)}
                        rows="5"
                        placeholder="Enter your note..."
                        required
                    ></textarea>
                    <button type="submit" onClick={handleSubmit}>Add Note</button>
               
            </div>
        </div>
      
    );
};

export default AddModal;
