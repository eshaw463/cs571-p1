import React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import MediaItemAdd from './MediaItemAdd.jsx';
import {
    MediaContext,
    UserMediaContext,
    SelectedUserContext
} from "../main/Context.jsx";
import Layout from "../main/Layout.jsx";

function AddMediaPage (props) {
    const navigate = useNavigate();
    
    const [media, setMedia] = useContext(MediaContext);
    const [usermedia, setUsermedia] = useContext(UserMediaContext);
    const [selectedUser] = useContext(SelectedUserContext);

    const [filterText, setFilterText] = useState("");

    const GenresByType = {
        "game": ["action", "adventure", "rpg", "fps", "mmo"],
        "music": ["pop", "rock", "hip-hop", "indie", "metal", "r&b"],
        "movie": ["action", "comedy", "drama", "horror", "sci-fi", "romance"]
    };
    const [mediaType, setMediaType] = useState("game");
    const [genre, setGenre] = useState(GenresByType.game[0]);

    const titleText = useRef();
    const bodyText = useRef();
    const imgText = useRef();

    function uploadMedia() {
        let name = titleText.current.value.trim();
        let body = bodyText.current.value;
        let imgURL = imgText.current.value;
        let type = mediaType;

        //updated to include type and genre
        const newItem = {
            name: name,
            id: name + body + imgURL + type + genre, 
            image: imgURL,
            description: body,
            type: type,
            genre: genre
        };

        const selectedUser = localStorage.getItem("SelectedUser");

        if (!selectedUser || selectedUser === "All Media") {
            alert("Please select a user on the main page before adding media.");
            return;
        }

        if (!usermedia.some(user => user.user === selectedUser)) {
            alert("Selected user could not be found.");
            return;
        }

        if (!name) {
            alert("Please enter a media title.");
            return;
        }

        // Add to global collection
        setMedia(prev => [...prev, newItem]);

        // Add to currently selected user's collection
        setUsermedia(prev =>
            prev.map(user =>
                user.user === selectedUser
                    ? {
                        ...user,
                        list: [...user.list, newItem]
                    }
                    : user
            )
        );

        navigate("/");
    }

       // Apply search to the selected collection
    const filteredMedia = media.filter(m =>
        m.name?.toLowerCase().includes(filterText.toLowerCase().trim()) ||
        m.description?.toLowerCase().includes(filterText.toLowerCase().trim())
    );

    function searchReset() {
        setFilterText("");
    }

// add from the global collection to a user collection
    function addFromMedia(id) {
           const selectedUser = localStorage.getItem("SelectedUser");

    // Find the selected user's collection
    const user = usermedia.find(user => user.user === selectedUser);

    if (!user) {
        alert("Selected user could not be found.");
        return;
    }

    // Find the media item in the global collection
    const mediaItem = media.find(item => item.id === id);

    if (!mediaItem) {
        alert("Media item could not be found.");
        return;
    }

    // Check whether the user already has this media
    if (user.list.some(item => item.id === id)) {
        alert("Cannot Add Duplicate Media!");
        return;
    }

    // Add the media item to the user's collection
    setUsermedia(prev =>
        prev.map(user =>
            user.user === selectedUser
                ? {
                    ...user,
                    list: [...user.list, mediaItem]
                }
                : user
        )
    );

    // alert("Media added!"); 
    navigate("/");
    }

    return (
        <>
            <div className="sidebar">
                <Sidebar />
            </div>

            <div className="content">
                <h1>Add Media</h1>


                <h2>Input Media</h2>
                <Form>
                    <Form.Label htmlFor="titleText">
                        Title
                    </Form.Label>

                    <Form.Control
                        id="titleText"
                        ref={titleText}
                        placeholder="Name of your media"
                    />

                    <Form.Label htmlFor="bodyText">
                        Description
                    </Form.Label>

                    <Form.Control
                        id="bodyText"
                        ref={bodyText}
                        placeholder="Short description"
                    />

                    <Form.Label htmlFor="imgText">
                        Image
                    </Form.Label>

                    <Form.Control
                        id="imgText"
                        ref={imgText}
                        placeholder="URL to an image for your media"
                    />

                    <Form.Label htmlFor="mediaType">
                        Type
                    </Form.Label>

                    <Form.Select
                        id="mediaType"
                        value={mediaType}
                        onChange={e => {
                            const nextType = e.target.value;
                            setMediaType(nextType);
                            setGenre(GenresByType[nextType][0]);
                        }}
                    >
                        {Object.keys(GenresByType).map(type => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </Form.Select>

                    <Form.Label htmlFor="genre">
                        Genre
                    </Form.Label>

                    <Form.Select
                        id="genre"
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                    >
                        {GenresByType[mediaType].map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </Form.Select>

                    <Button
                        id="addNewMedia"
                        type="button"
                        onClick={uploadMedia}
                        style={{
                            margin: 5,
                            backgroundColor: "#bf5f1c",
                            borderWidth: 0
                        }}
                    >
                        Add New Media
                    </Button>

                    <Button
                        type="button"
                        onClick={() => navigate("/")}
                        style={{
                            margin: 5,
                            backgroundColor: "#623c7a",
                            borderWidth: 0
                        }}
                    >
                        Cancel
                    </Button>
                </Form>

                <br/>
                <br/>

                <h2>Find From Database</h2>

                <Form>
                    <Form.Label htmlFor="searchContains">
                        Search
                    </Form.Label>

                    <Form.Control
                        id="searchContains"
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                        placeholder="Search for a piece of media to add..."
                    />

                    <br />

                    <Button
                        id="resetSearch"
                        onClick={searchReset}
                    >
                        Reset Search
                    </Button>
                </Form>

                <Container className="mt-5">
                    <Row>
                        {filteredMedia.map(s => (
                            <Col key={s.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                                <MediaItemAdd {...s} remove={addFromMedia}/>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default AddMediaPage;