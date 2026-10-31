import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return <>
    <h1>404.</h1>
    <p>Go somewhere else.</p>
    <a
      onClick={() => navigate('/add-media')}
      style={{color: "blue"}}
    >Back to safety</a>
  </>;
}

export default NotFound;