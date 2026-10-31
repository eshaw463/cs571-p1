import React from 'react';
import { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

function MediaItem(props) {
  // State Var

  // useEffects

  return <Card style={{backgroundColor: "rgba(0, 0, 0, 0)",
    color: "#ffffff", border: '0.1rem solid #623c7a',
    borderRadius: "0.75rem", padding: '10px', margin: '5px'}}>
    <div style={{
      position: "absolute",
      inset: 0,
      backgroundColor: "#0a0512",
      backgroundImage: "repeating-linear-gradient(0deg, #fff 0 0.01rem, transparent 0.02rem 7px)",
      opacity: ".07",
      border: '0rem solid #623c7a', borderRadius: "0.75rem",
      padding: '0rem', margin: '0rem'}}
    ></div>
    <p>{props ? props.name : "No item name provided"}</p>
    <p>img here from database</p>
    <p>item description from database</p>
  </Card>;
};

export default MediaItem;
