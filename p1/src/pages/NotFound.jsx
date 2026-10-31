import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  return <>
    <h1>404.</h1>
    <p>Go somewhere else.</p>
    <a
      id="returnLink"
      onClick={() => navigate('/')}
    >Back to safety</a>
  </>;
}

export default NotFound;