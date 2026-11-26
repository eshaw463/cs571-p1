import React from 'react';

function AddButton(props) {
    return <div style={{position: "absolute", right: "0px", top: "0px",
        border: "0.02rem solid #1cbf1f", borderRadius: "1rem",
        padding: "0.1rem 0.8rem", backgroundColor: "#152a17",
        userSelect: "none"}}
        onClick={() => {
            props.remove(props.id);
        }}>
        +
    </div>;
}

export default AddButton;
