import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import Sidebar from './Sidebar.jsx';
import MediaItem from "./MediaItem.jsx";

const AddMediaPage = (props) => {
 // starting var
  let testArr = [
      { name: "Serial Experiments Lain", id: "sel", image: "https://upload.wikimedia.org/wikipedia/en/3/32/Serial_Experiments_Lain_DVD_vol_1.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled", description: "1996 anime"},
      { name: "Come In", id: "comeinweatherday", image: "https://t2.genius.com/unsafe/861x861/https%3A%2F%2Fimages.genius.com%2Fa414dc591550f011823d77397b6b7e2e.1000x1000x1.jpg" , description: "Album by Weatherday"},
      { name: "Six of Crows", id: "sixofcrows", image: "https://upload.wikimedia.org/wikipedia/en/1/10/Six_of_Crows_by_Leigh_Bardugo_book_cover.jpeg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail_unscaled" , description: "Book by Leigh Bardugo"},
      { name: "Celeste", id: "celeste", image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Celeste_box_art_full.png/500px-Celeste_box_art_full.png?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail" , description: "Game by Maddy Thorson"}
    ];



  // State Variables
    const [media, setMedia] = useState(() => {
            const saved = JSON.parse(sessionStorage.getItem('SessionMedia'))
            console.log(saved);
            return saved ? saved : testArr;
        });
    // session storage to stay during reload as long as browser isn't closed, must also be used & modified by AddMedia page
    const [filterContains, setFilterContains] = useState();
    const [loaded, loader] = useState(false);


  const titleText = useRef();
  const bodyText = useRef();
  const imgText = useRef();




// TEST FOR ADD MEDIA
// function addMedia() {
//   const newItem = {
//     name: "aa",
//     id: "aa", 
//     image: "aa",
//     description: "aa"
//   };

//   let newMedia = [...media];
//   newMedia.push(newItem);
  
//   sessionStorage.setItem('SessionMedia', JSON.stringify(newMedia))
//   setMedia(JSON.parse(sessionStorage.getItem('SessionMedia')))
// }


  // LOAD MEDIA
 function loadMedia(){
  //
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
            <Button id="addNewMedia" onClick={() => {
              let nomen = titleText.current.value;
              let bod = bodyText.current.value;
              let pic = imgText.current.value;

                const newItem = {
                name: nomen,
                id: nomen+bod+pic, 
                image: pic,
                description: bod
              };

              let newMedia = [...media];
              newMedia.push(newItem);
              
              sessionStorage.setItem('SessionMedia', JSON.stringify(newMedia))
              setMedia(JSON.parse(sessionStorage.getItem('SessionMedia')))

            }}>Add New Media</Button>
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
