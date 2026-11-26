import React, { useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { SelectedUserContext, UserMediaContext } from '../main/Context.jsx';

function Sidebar() {
    const navigate = useNavigate();

    const [selectedUser, setSelectedUser] = useContext(SelectedUserContext);
    const [usermedia] = useContext(UserMediaContext);

    function changeUser(e) {
        setSelectedUser(e.target.value);
    }

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
        <div id="sidebar">

            {/* USER SELECTION */}
            <Form.Group style={{ margin: "1rem", width: "13rem" }}>
                <Form.Label>Select User</Form.Label>

                <Form.Select
                    value={selectedUser}
                    onChange={changeUser}
                >
                    {usermedia.map(user => (
                        <option key={user.user} value={user.user}>
                            {user.user}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            {/* ADD MEDIA BUTTON */}
            <Button
                id="add-media-button"
                onClick={() => navigate('/add-media')}
                style={{
                    margin: "1rem",
                    width: "13rem",
                    height: "13rem"
                }}
            >
                +
            </Button>

            {/* SMALLER SIDEBAR BUTTONS */}
            <Button
                className="sidebar-button"
                onClick={filterGames}
                style={{ margin: "0.2rem 1rem" }}
            >
                Games
            </Button>

            <Button
                className="sidebar-button"
                onClick={filterMusic}
                style={{ margin: "0.2rem 1rem" }}
            >
                Music
            </Button>

            <Button
                className="sidebar-button"
                onClick={filterMovies}
                style={{ margin: "0.2rem 1rem" }}
            >
                Movies
            </Button>

        </div>
    );
}

export default Sidebar;