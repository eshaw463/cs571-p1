import { useState, useEffect } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { Button, Container, Form, Row, Col, Pagination } from 'react-bootstrap';
import MediaItem  from "./MediaItem.jsx";

import './App.css'

function App() {
  const [media, setMedia] = useState(0)

  
  const testArr = {
    name:"a", id:"a"
  }

  return (
    <>
      <h1>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</h1>

        <Container fluid>
            <Row id='media-items'>
            {setMedia(testArr)}
            {media.map(s => <Col key={s.id} xs={12} s={12} md={6} lg={4} xl={3}> <p>{MediaItem(s)}</p> </Col>)}
          
            </Row>
        </Container>

    </>
  )
}

export default App
