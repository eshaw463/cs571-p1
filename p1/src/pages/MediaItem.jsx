import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

function MediaItem(props) {
  // State Var

  // useEffects

  return <Card style={{backgroundColor: "rgba(0, 0, 0, 0)",
  color: "#ffffff", border: '0.1rem solid blue', borderRadius: "0.75rem",
  padding: '10px', margin: '5px'}}>
    <p>{props ? props.name : "No item name provided"}</p>
    <p>img here from database</p>
    <p>item description from database</p>
  </Card>;
};

export default MediaItem;
