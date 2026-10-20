import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import MediaItem from "./MediaItem.jsx";


function App() {
  // State Variables
  const [media, setMedia] = useState([]);

  //useEffects
  useEffect(() => {
    const testArr = [
      { name: "Item A", id: "a" },
      { name: "Item B", id: "b" },
      { name: "Item C", id: "c" }
    ];
    setMedia(testArr);
  }, []);


// App Return
  return (
    <>
    <h1>AAAAAAAAAAAAAAAA</h1>
    <Container className="mt-5">
      <Row>
        {media.map((s) => (
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