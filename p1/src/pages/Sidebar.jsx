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
        <div id="sidebar" style={{borderRight: "1px solid black"}}>
            {/* ADD MEDIA BUTTON */}
            <Button
                id="add-media-button"
                onClick={() => navigate('/add-media')}
                style={{margin: "1rem", width: "13rem", height: "13rem"}}
            >
                +
            </Button>

            {/* SMALLER SIDEBAR BUTTONS */}
            <Button
                className="sidebar-button"
                onClick={filterGames}
                style={{marginTop: "0.2rem", marginBottom: "0.2rem",
                    marginLeft: "1rem", marginRight: "1rem"}}
            >
                Games
            </Button>

            <Button
                className="sidebar-button"
                onClick={filterMusic}
                style={{marginTop: "0.2rem", marginBottom: "0.2rem",
                    marginLeft: "1rem", marginRight: "1rem"}}
            >
                Music
            </Button>

            <Button
                className="sidebar-button"
                onClick={filterMovies}
                style={{marginTop: "0.2rem", marginBottom: "0.2rem",
                    marginLeft: "1rem", marginRight: "1rem"}}
            >
                Movies
            </Button>
        </div>
    );
}

export default Sidebar;