import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';

const AddMediaPage = (props) => {
  // State Var
  const titleText = useRef();
  const bodyText = useRef();
  const imgText = useRef();

  // useEffects

  return <>

    <Form>
            <Form.Label htmlFor="titleText">Title</Form.Label>
            <Form.Control id="titleText" ref={titleText}/>
            <Form.Label htmlFor="bodyText">Description</Form.Label>
            <Form.Control id="bodyText" ref={bodyText}/>
            <Form.Label htmlFor="imgText">Image</Form.Label>
            <Form.Control id="imgText" ref={imgText}/>
		</Form>


</>
};

export default AddMediaPage;
