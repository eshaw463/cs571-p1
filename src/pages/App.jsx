import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form, Image } from 'react-bootstrap';
import MediaItem from "./MediaItem.jsx";
import Sidebar from './Sidebar.jsx';

// right now the filter & search is fucked up & is duplicating elements (after adding one) !!!!!!!! fix later


function App() {
  // starting var
  let testArr = [
      { name: "Item A", id: "a", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQFSI1xfZQ5sLjCUPoF7rroMUtVTO4L-JO8tyPEBImP4AR6vKP2V704T4&s=10"},
      { name: "Item B", id: "b", image: "y" , description: "waaaaaaa"},
      { name: "Item C", id: "c", image: "z" , description: "waaaaaaa"},
      { name: "Item D", id: "d", image: "k" , description: "waaaaaaa"}
    ];


  // State Variables
  // will eventually be session storage to stay during reload as long as browser isn't closed, must also be used & modified by AddMedia page
  const [filterContains, setFilterContains] = useState();
  const [loaded, loader] = useState(false);

  const [media, setMedia] = useState(() => {
        const saved = JSON.parse(sessionStorage.getItem('SessionMedia'))
        console.log(saved);
        return saved ? saved : testArr;
    });


  /* 
  
    backend connections
  
  */
 // LOAD MEDIA
 function loadMedia(){
   // sessionStorage.setItem('SessionMedia', JSON.stringify(media))
 }





  /*

    Filters

  */
  let filteredMedia = media?.filter(
    m => m.name?.toLowerCase().includes(filterContains?.toLowerCase().trim())
    || m.image?.toLowerCase().includes(filterContains?.toLowerCase().trim())
  );
  // TODO: add OR statements for description so searching seaches both name &
  //     description at once!!!! (unless we just want it to be name)


  /**
   * UseEffects
   */
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