import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import MediaItem from "./MediaItem.jsx";

function AddMediaPage (props) {
  const navigate = useNavigate();

  // starting var
  let testArr = [
    { name: "Serial Experiments Lain", id: "sel", image: "https://upload.wikimedia.org/wikipedia/en/3/32/Serial_Experiments_Lain_DVD_vol_1.jpg", description: "1996 anime"},
    { name: "Come In", id: "comeinweatherday", image: "https://t2.genius.com/unsafe/861x861/https%3A%2F%2Fimages.genius.com%2Fa414dc591550f011823d77397b6b7e2e.1000x1000x1.jpg" , description: "Album by Weatherday"},
    { name: "Six of Crows", id: "sixofcrows", image: "https://upload.wikimedia.org/wikipedia/en/1/10/Six_of_Crows_by_Leigh_Bardugo_book_cover.jpeg" , description: "Book by Leigh Bardugo"},
    { name: "Celeste", id: "celeste", image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Celeste_box_art_full.png/500px-Celeste_box_art_full.png" , description: "Game by Maddy Thorson"}
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

  function uploadMedia() {
    let name = titleText.current.value;
    let body = bodyText.current.value;
    let imgURL = imgText.current.value;

    const newItem = {
      name: name,
      id: name + body + imgURL, 
      image: imgURL,
      description: body
    };

    let newMedia = [...media];
    newMedia.push(newItem);

    sessionStorage.setItem('SessionMedia', JSON.stringify(newMedia));
    setMedia(JSON.parse(sessionStorage.getItem('SessionMedia')));

    navigate("/");
  }

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

  // useEffects
  useEffect(() => {
    // set media upon first load
  }, []);

  /*
    Filters
   */
  let filteredMedia = media?.filter(
    m => m.name?.toLowerCase().includes(filterContains?.toLowerCase().trim())
    || m.image?.toLowerCase().includes(filterContains?.toLowerCase().trim())
  );
  // TODO: add OR statements for description so searching seaches both name &
  //     description at once!!!! (unless we just want it to be name)

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
        <Form.Control id="titleText" ref={titleText}
          placeholder="Name of your media"/>
        <Form.Label htmlFor="bodyText">Description</Form.Label>
        <Form.Control id="bodyText" ref={bodyText}
          placeholder="Short description"/>
        <Form.Label htmlFor="imgText">Image</Form.Label>
        <Form.Control id="imgText" ref={imgText}
          placeholder="URL to an image for your media"/>
        <Button id="addNewMedia" onClick={uploadMedia} style={{margin: 5, backgroundColor: "#bf5f1c", borderWidth: 0}}>Add New Media</Button>
        <Button onClick={() => navigate("/")} style={{margin: 5, backgroundColor: "#623c7a", borderWidth: 0}}>Cancel</Button>
      </Form>
    </div>
  </>
};

export default AddMediaPage;
