import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import MediaItem from "./MediaItem.jsx";
function App() {

  // State Variables
  const [media, setMedia] = useState([]);
  const [filterContains, setFilterContains] = useState();
  const [loaded, loader] = useState(false);

  // variables
  let filteredMedia = media?.filter(m => m.name?.toLowerCase().includes(filterContains?.toLowerCase().trim())
|| m.img?.toLowerCase().includes(filterContains?.toLowerCase().trim()))
// add OR statements for description so searching seaches both name & description at once!!!! (unless we just want it to be name)
// we should make sidebar buttons filter by GENRE or by MEDIA TYPE (music, game, etc)

  //useEffects

  // sample "database" we are using before making an actual database
      // we will have to make it such that users can add items that alr exist in the database
  useEffect(() => {
    const testArr = [
      { name: "Item A", id: "a", img: "x" },
      { name: "Item B", id: "b", img: "y" },
      { name: "Item C", id: "c", img: "z" },
      { name: "Item D", id: "d", img: "k" }
    ];
    setMedia(testArr);

  }, []);

// reset search
function searchReset(){
	setFilterContains("");
} // some state var set to nothing


// App Return
  return (
    <>
    <h1>AAAAAAAAAAAAAAAA</h1>

    <Form>
            <Form.Label htmlFor="searchContains">Search</Form.Label>
            <Form.Control id="searchContains" value={filterContains} onChange={e => {setFilterContains(e.target.value); loader(true)}}/>
            <br />
            <Button onClick={searchReset}>Reset Search</Button> 
			<br />
			<br />
			
        </Form>


    <Container className="mt-5">
      <Row>
        {loaded ? filteredMedia?.map((s) => (
            <Col key={s.id} xs={12} sm={12} md={6} lg={4} xl={3}>
              {MediaItem(s)}
            </Col>
          )) : /* THIS TERNARY LOADS ALL DATA WHEN PAGE IS FIRST LOADED*/ media?.map((s) => (
            <Col key={s.id} xs={12} sm={12} md={6} lg={4} xl={3}>
              {MediaItem(s)}
            </Col>
          ))}
      </Row>
    </Container>
    </>
  );
}

export default App;