import React, { useContext, useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form, Image } from 'react-bootstrap';
import MediaItem from "./MediaItem.jsx";
import Sidebar from './Sidebar.jsx';
import './App.css';
import {
    MediaContext,
    UserMediaContext,
    SelectedUserContext
} from "../main/Context.jsx";

// right now the filter & search is fucked up & is duplicating elements (after adding one) !!!!!!!! fix later
function App() {
    // State Variables
    const [filterText, setFilterText] = useState("");
    
    const [media, setMedia] = useContext(MediaContext);
    const [usermedia, setUsermedia] = useContext(UserMediaContext);
    const [selectedUser] = useContext(SelectedUserContext);
    const [genre, setGenre] = useState("");
    const [type, setType] = useState("");
    console.log("LAYOUT MEDIA:", media);
    console.log("TYPE:", media.find(m => m.id === "celeste")?.type);

    /*
     * Filters
     */

    // Get media from selected user
    const displayedMedia =
    usermedia.find(user => user.user === selectedUser)?.list || [];

    // Apply search to the selected collection
    const filteredMedia = displayedMedia.filter(m =>
        console.log("Media", m) || 
        (
            m.name?.toLowerCase().includes(filterText.toLowerCase().trim()) ||
            m.description?.toLowerCase().includes(filterText.toLowerCase().trim()) 
        ) && 
        (
         !type || m.type?.toLowerCase().includes(type.toLowerCase().trim())
        ) && 
        (
        ! genre || m.genre?.toLowerCase().includes(genre.toLowerCase().trim()) 
        )     
    );

    // reset search
    function searchReset() {
        // just set the state variable to nothing
        setFilterText("");
        setGenre("");
        setType("");
    }
    
    // For media removal from selected user
    const remove = (id) => {
        setUsermedia(prev =>
        prev.map(user =>
            user.user === selectedUser
                ? {
                    ...user,
                    list: user.list.filter(item => item.id !== id)
                }
                : user
        )
    );
    }

    // App Return
    return <>
      <div className="sidebar">
        <Sidebar filterType = {setType} />
      </div>

        <div className="content">
            <h1>MediaHornet</h1>

            <Form>
                    <Form.Label htmlFor="searchContains">
                        Search
                    </Form.Label>

                    <Form.Control
                        id="searchContains"
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                        placeholder="Search for a piece of media..."
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
                            <MediaItem {...s} remove={remove} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    </>;
}

export default App;