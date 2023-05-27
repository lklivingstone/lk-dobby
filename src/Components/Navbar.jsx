import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from "react-router-dom";
import './Navbar.css';


function Navbar() {
    const navigate= useNavigate()

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const handleSearchClick = () => {
        navigate("/gallery")
    };

    return (
        <nav className='navbar' style={{ display: "flex", padding: "20px"}}>
            <div style={{display: "flex", flex: 1, justifyContent: "flex-start", padding: "10px 40px"}}>
                <h1 style={{backgroundColor: "rgb(48, 48, 48)", color: "#ffe5ec"}}>dobby-ads.</h1>
            </div>
            <div style={{display: "flex", flex: 1, justifyContent: "flex-end", padding: "10px 40px", alignItems: "center"}}>
                
                <IconButton type="button" aria-label="search">
                    <SearchIcon className="search-icon" onClick={handleSearchClick}/>
                    {/* <SearchIcon /> */}
                </IconButton>

                <div className={`search-bar ${isSearchOpen ? 'open' : ''}`}>
                <InputBase
                    sx={{ ml: 1, flex: 1, variant:"outlined", }}
                    placeholder="Search..."
                />
                    {/* <input type="text" placeholder="Search..." /> */}
                </div>
                
            </div>
            <div className="border"></div>
        </nav>
  );
}

export default Navbar;
