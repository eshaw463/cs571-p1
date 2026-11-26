import React, { useContext, useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form, Image } from 'react-bootstrap';
import MediaItem from "./MediaItem.jsx";
import Sidebar from './Sidebar.jsx';
import './App.css';
import Context from "../main/Context.jsx";
import Layout from "../main/Layout.jsx";

// right now the filter & search is fucked up & is duplicating elements (after adding one) !!!!!!!! fix later
function App() {
    // State Variables
    // will eventually be session storage to stay during reload as long as browser isn't closed, must also be used & modified by AddMedia page
    const [filterText, setFilterText] = useState("");
    const [media, setMedia] = useContext(Context);
    const [filteredMedia, setFilteredMedia] = useState(undefined);

    /*
     * backend connections
     */

    /*
     * Filters
     */
    // TODO: add OR statements for description so searching seaches both name &
    //     description at once!!!! (unless we just want it to be name)
   useEffect(() => {
    let filtered;

    if (filterText.trim() === "") {
        filtered = media;
    } else {
        filtered = media.filter(m =>
            m.name?.toLowerCase().includes(filterText.toLowerCase().trim()) ||
            m.description?.toLowerCase().includes(filterText.toLowerCase().trim())
        );
    }

    setFilteredMedia(filtered);
}, [media, filterText]);

    // reset search
    function searchReset() {
        // just set the state variable to nothing
        setFilterText("");
    }

    // For media removal ... edit later lol
    const remove = (id) => {
        let newMedia = media.filter((val) => val.id !== id);
        sessionStorage.setItem('SessionMedia', JSON.stringify(newMedia));
        setMedia(JSON.parse(sessionStorage.getItem('SessionMedia')));
    }

    // App Return
    return <>
      <div className="sidebar">
        <Sidebar/>
      </div>

        <div class="content">
            <h1>MediaHornet</h1>

            <Form>
                <Form.Label htmlFor="searchContains">Search</Form.Label>
                <Form.Control
                    id="searchContains"
                    value={filterText}
                    onChange={e => {setFilterText(e.target.value)}}
                    placeholder="Search for a piece of media..."
                />
                <br />
                <Button id="resetSearch" onClick={searchReset}>Reset Search</Button>
                <br />
                <br />
            </Form>

            <Container className="mt-5">
                <Row>
                  {media ? filteredMedia?.map((s) => (
                      <Col key={s.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                          <MediaItem {...s} remove={remove} />
                      </Col>
                  )) : /* THIS TERNARY LOADS ALL DATA WHEN PAGE IS FIRST LOADED */
                  media?.map((s) => (
                      <Col key={s.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                          <MediaItem {...s} remove={remove}></MediaItem>
                      </Col>
                  ))}
                </Row>
            </Container>
        </div>
    </>;
}

export default App;