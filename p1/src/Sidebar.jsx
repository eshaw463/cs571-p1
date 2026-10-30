import './App.css';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate = useNavigate();

    // Example button functions
    function filterGames() {
        console.log("Filtering games");
    }

    function filterMusic() {
        console.log("Filtering music");
    }

    function filterMovies() {
        console.log("Filtering movies");
    }

    return (
        <div className="sidebar">

            {/* ADD MEDIA BUTTON */}
            <Button
                className="add-media-button"
                onClick={() => navigate('/add-media')}
            >
                +
            </Button>

            {/* SMALLER SIDEBAR BUTTONS */}
            <Button
                className="sidebar-button"
                onClick={filterGames}
            >
                Games
            </Button>

            <Button
                className="sidebar-button"
                onClick={filterMusic}
            >
                Music
            </Button>

            <Button
                className="sidebar-button"
                onClick={filterMovies}
            >
                Movies
            </Button>

        </div>
    );
}

export default Sidebar;