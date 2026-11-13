import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import MediaItem from "./MediaItem.jsx";
import Sidebar from './Sidebar.jsx';

function App() {
  // State Variables
  const [media, setMedia] = useState([]); 
  // will eventually be session storage to stay during reload as long as browser isn't closed, must also be used & modified by AddMedia page
  const [filterContains, setFilterContains] = useState();
  const [loaded, loader] = useState(false);


  /* 
  
    backend connections
  
  */
 // LOAD MEDIA
 function loadMedia(){
  let testArr = [
      { name: "Item A", id: "a", image: "x"},
      { name: "Item B", id: "b", image: "y" , description: "waaaaaaa"},
      { name: "Item C", id: "c", image: "z" , description: "waaaaaaa"},
      { name: "Item D", id: "d", image: "k" , description: "waaaaaaa"}
    ];
    setMedia(testArr);
 }

// ADD MEDIA
function addMedia(n, i, img, d) {
// button existing causes too many rerenders... why?????
  const newItem = {
    name: n,
    id: i, 
    image: img,
    description: d
  };

  let newMedia = [...media];
  newMedia.push(newItem);

  setMedia(newMedia);
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

      {/*<Button id="aaaaaaaaaaa" onClick={addMedia("Item E", "4", "image", "woof")}>Test Button</Button>*/}

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