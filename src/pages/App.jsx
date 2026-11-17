import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form, Image } from 'react-bootstrap';
import MediaItem from "./MediaItem.jsx";
import Sidebar from './Sidebar.jsx';
import './App.css';

// right now the filter & search is fucked up & is duplicating elements (after adding one) !!!!!!!! fix later

function App() {
  // starting var
  let testArr = [
    { name: "Serial Experiments Lain", id: "sel", image: "https://upload.wikimedia.org/wikipedia/en/3/32/Serial_Experiments_Lain_DVD_vol_1.jpg", description: "1996 anime"},
    { name: "Come In", id: "comeinweatherday", image: "https://t2.genius.com/unsafe/861x861/https%3A%2F%2Fimages.genius.com%2Fa414dc591550f011823d77397b6b7e2e.1000x1000x1.jpg" , description: "Album by Weatherday"},
    { name: "Six of Crows", id: "sixofcrows", image: "https://upload.wikimedia.org/wikipedia/en/1/10/Six_of_Crows_by_Leigh_Bardugo_book_cover.jpeg" , description: "Book by Leigh Bardugo"},
    { name: "Celeste", id: "celeste", image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Celeste_box_art_full.png/500px-Celeste_box_art_full.png" , description: "Game by Maddy Thorson"}
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
  useEffect(() => {
    // set media upon first load
    console.log(JSON.parse(sessionStorage.getItem('SessionMedia')));
  }, []);


  /*
    Filters
  */
  let filteredMedia = media?.filter(
    m => m.name?.toLowerCase().includes(filterContains?.toLowerCase().trim())
    || m.description?.toLowerCase().includes(filterContains?.toLowerCase().trim())
  );
  // TODO: add OR statements for description so searching seaches both name &
  //     description at once!!!! (unless we just want it to be name)

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