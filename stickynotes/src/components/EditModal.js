import React, { useState, useEffect } from "react";

const EditModal = ({ showModal, closeModal, noteToEdit, handleEditNote }) => {
    const [title, setTitle] = useState("");
    const [note, setNote] = useState("");

    useEffect(() => {
        if (noteToEdit) {
            setTitle(noteToEdit.title || "");
            setNote(noteToEdit.note || "");
        }
    }, [noteToEdit]);

    const handleSubmit = () => {
        const editedNote = {
            id: noteToEdit.id,
            title: title,
            note: note,
        };

        handleEditNote(editedNote);
    };

    if (!showModal) {
        return null;
    }

    return (
        <div id="editModal" className={`modal ${showModal ? "" : "hidden"}`}>
            <div className="modal-content">
                <span className="close closeEdit" onClick={closeModal}>
                    &times;
                </span>
                <h2>Edit Sticky Note</h2>
                <input
                    type="text"
                    id="edit-note-title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea
                    id="edit-note-text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows="5"
                    placeholder="Enter your note..."
                ></textarea>
                <button id="update-note" onClick={handleSubmit}>
                    Update Note
                </button>
            </div>
        </div>
    );
};

export default EditModal;
