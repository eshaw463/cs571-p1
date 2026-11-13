import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import Sidebar from './Sidebar.jsx';
import MediaItem from "./MediaItem.jsx";

const AddMediaPage = (props) => {
  // State Var
  // State Variables
    const [media, setMedia] = useState([]); 
    // will eventually be session storage to stay during reload as long as browser isn't closed, must also be used & modified by AddMedia page
    const [filterContains, setFilterContains] = useState();
    const [loaded, loader] = useState(false);


  const titleText = useRef();
  const bodyText = useRef();
  const imgText = useRef();




  // LOAD MEDIA
 function loadMedia(){
  // PULL FROM SESSION STORAGE OF MEDIA RATHER THAN RECREATING THE WHOLE THING HERE!!!!!!!!!!!!!!
  let testArr = [
      { name: "Item A", id: "a", image: "x"},
      { name: "Item B", id: "b", image: "y" , description: "waaaaaaa"},
      { name: "Item C", id: "c", image: "z" , description: "waaaaaaa"},
      { name: "Item D", id: "d", image: "k" , description: "waaaaaaa"}
    ];
    setMedia(testArr);
 }

  // useEffects

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
  const addToUser = (id) => {
    // setMedia(media => media.filter((val) => val.id !== id));
  }



  return <>
      <div class="sidebar">
      <Sidebar/>
    </div>


    <div class="content">
          <Form>
            <Form.Label htmlFor="titleText">Title</Form.Label>
            <Form.Control id="titleText" ref={titleText}/>
            <Form.Label htmlFor="bodyText">Description</Form.Label>
            <Form.Control id="bodyText" ref={bodyText}/>
            <Form.Label htmlFor="imgText">Image</Form.Label>
            <Form.Control id="imgText" ref={imgText}/>
            <Button id="addNewMedia">Add New Media</Button>
            <br />
            <br />
            <br />
		</Form>


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
              <MediaItem {...s} remove={addToUser}></MediaItem> {/* will make this an add button back to the prev page instead of remove here */}
            </Col>
          ))}
        </Row>
      </Container>
    </div>

  </>
};

export default AddMediaPage;
