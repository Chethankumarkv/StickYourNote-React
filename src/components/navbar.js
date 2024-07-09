import React, { useState } from 'react';
import '../css/App.css'
import userIcon from '../Images/user-icon2.png';
const Navbar = ({onSearch}) => {
   
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        onSearch(searchTerm);
    };
    const handleClearSearch = () => {
        setSearchTerm('');
        onSearch('');
    };
    return (
        <nav className="navbar">
            <div className="container">
                <a href="/" className="logo">StickUrNote</a>
                <div className="search-bar">
                    <input type="text" placeholder="Search...🔍" value={searchTerm}  onChange={handleSearch} />
                    {searchTerm && (
                        <button className="clear-button" onClick={handleClearSearch}>
                            Clear
                        </button>
                    )}
                </div>

                <div className="user-icon">
                    <a href="https://chethankumarkv.github.io/"><img src={userIcon} alt="User Icon" /></a>
                </div>

            </div>
        </nav>
    )
}
export default Navbar;