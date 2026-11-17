import React from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import MediaItem from "./MediaItem.jsx";
import Context from "../main/Context.jsx";

function AddMediaPage (props) {
    const navigate = useNavigate();
    const [media, setMedia] = useContext(Context);

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
    //     const newItem = {
    //         name: "aa",
    //         id: "aa", 
    //         image: "aa",
    //         description: "aa"
    //     };

    //     let newMedia = [...media];
    //     newMedia.push(newItem);
        
    //     sessionStorage.setItem('SessionMedia', JSON.stringify(newMedia))
    //     setMedia(JSON.parse(sessionStorage.getItem('SessionMedia')))
    // }

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
                <Button id="addNewMedia" onClick={uploadMedia}
                    style={{margin: 5, backgroundColor: "#bf5f1c", borderWidth: 0}}
                >Add New Media</Button>
                <Button onClick={() => navigate("/")}
                    style={{margin: 5, backgroundColor: "#623c7a", borderWidth: 0}}
                >Cancel</Button>
            </Form>
        </div>
    </>
};

export default AddMediaPage;
