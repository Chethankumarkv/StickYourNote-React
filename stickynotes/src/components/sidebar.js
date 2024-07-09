import React from "react";
import '../css/App.css';

const Sidebar = ({ openAddModal,toggleShowDeleted,viewAllNotes,viewStarNotes,handleClearAll,handleClearRecycleBin}) => {
    return (
        <div className="sidebar">
            <h2>ToolBar  🔍</h2>
            <ul>
                <li><button className="option-btn" id="add-note-btn" onClick={openAddModal}><span>➕</span>Add Sticky Note</button></li>
                <li><button className="option-btn" id="view-note" onClick={viewAllNotes}><span>👁️</span>View All Notes</button></li>
                <li><button className="option-btn" id="star-note"onClick={viewStarNotes}><span>⭐</span>View Starred Notes</button></li>
                <li><button className="option-btn" id="clear-All" onClick={handleClearAll}><span>🧹</span>Clear All Notes</button></li>
                <li><button className="option-btn" id="deleted" onClick={toggleShowDeleted}><span>♻️</span>Deleted Notes</button></li>
                <li><button className="option-btn" id="recycle" onClick={handleClearRecycleBin}><span>🚮</span>Clear Recycle Bin</button></li>
            </ul>
        </div>
    );
};

export default Sidebar;
