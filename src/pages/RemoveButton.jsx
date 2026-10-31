import React from 'react';

function RemoveButton(props) {
  return <div style={{position: "absolute", right: "0px", top: "0px",
    border: "0.02rem solid #bf5f1c", borderRadius: "1rem",
    padding: "0.1rem 0.8rem", backgroundColor: "#2a151b",
    userSelect: "none"}}
    onClick={() => {
      props.remove(props.id);
    }}>
    -
  </div>;
}

export default RemoveButton;
