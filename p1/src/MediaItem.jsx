import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const MediaItem = (props) => {
 // State Var

 //useEffects


 
 
  return (
    <div style={{ border: '1px solid blue', padding: '10px', margin: '5px' }}>
      <p>Card content below:</p>
      <p>{props?.name}</p>
    </div>
  );
};

export default MediaItem;