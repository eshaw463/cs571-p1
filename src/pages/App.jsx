import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import MediaItem from "./MediaItem.jsx";
import Sidebar from './Sidebar.jsx';

function App() {
  // State Variables
  const [media, setMedia] = useState([]);
  const [filterContains, setFilterContains] = useState();
  const [loaded, loader] = useState(false);


  // backend connections
 function loadMedia(){
  fetch('../../backend/media.json')
  .then(response => {
    if (!response.ok) throw new Error('response not ok');
    return response.json();
  })
  .then(data => {

    // sets media
    setMedia(JSON.parse(JSON.stringify(data)));
    return 0;
  })
 }


  // variables
  let filteredMedia = media?.filter(
    m => m.name?.toLowerCase().includes(filterContains?.toLowerCase().trim())
    || m.img?.toLowerCase().includes(filterContains?.toLowerCase().trim())
  );
  // TODO: add OR statements for description so searching seaches both name &
  //     description at once!!!! (unless we just want it to be name)


  useEffect(() => {
    // set media upon first load
    loadMedia();

  }, []);

  // reset search
  function searchReset() {
    // just set the state variable to nothing
    setFilterContains("");
  }

  // For media removal ... edit later lol
  const remove = (id) => {
    setMedia(media => media.filter((val) => val.id !== id));
  }

  // App Return
  return <>
    <div class="sidebar">
      <Sidebar/>
    </div>

    <div class="content">
      <h1>MediaHornet</h1>

      <Form>
        <Form.Label htmlFor="searchContains">Search</Form.Label>
        <Form.Control
          id="searchContains"
          value={filterContains}
          onChange={e => {setFilterContains(e.target.value); loader(true)}}
          placeholder="Search for a piece of media..."
        />
        <br />
        <Button id="resetSearch" onClick={searchReset}>Reset Search</Button>
        <br />
        <br />
      </Form>

      <Button id="aaaaaaaaaaa">Test Button</Button>

      <Container className="mt-5">
        <Row>
          {loaded ? filteredMedia?.map((s) => (
            <Col key={s.id} xs={12} sm={12} md={6} lg={4} xl={3}>
              {MediaItem(s)}
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