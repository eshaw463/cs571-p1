import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Context from "./Context.jsx";

function Layout(props) {
    // starting var
    let testArr = [
        { name: "Serial Experiments Lain", id: "sel", image: "https://upload.wikimedia.org/wikipedia/en/3/32/Serial_Experiments_Lain_DVD_vol_1.jpg", description: "1996 anime"},
        { name: "Come In", id: "comeinweatherday", image: "https://t2.genius.com/unsafe/861x861/https%3A%2F%2Fimages.genius.com%2Fa414dc591550f011823d77397b6b7e2e.1000x1000x1.jpg" , description: "Album by Weatherday"},
        { name: "Six of Crows", id: "sixofcrows", image: "https://upload.wikimedia.org/wikipedia/en/1/10/Six_of_Crows_by_Leigh_Bardugo_book_cover.jpeg" , description: "Book by Leigh Bardugo"},
        { name: "Celeste", id: "celeste", image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Celeste_box_art_full.png/500px-Celeste_box_art_full.png" , description: "Game by Maddy Thorson"}
    ];

    // LOAD MEDIA
    // set media upon first load
    const [media, setMedia] = useState(() => {
        const saved = JSON.parse(sessionStorage.getItem('SessionMedia'));

        // TODO: remove
<<<<<<< HEAD
        if (!saved || saved.length === 0) {
=======
        if (saved === undefined || saved === null || saved.length === 0) {
>>>>>>> f1680951d6432fcb4bc05b29aaf1fc4ecd1fd7af
            return testArr;
        }

        return saved;
    });

    return <Context.Provider value={[media, setMedia]}>
        <Outlet />
    </Context.Provider>;
}

export default Layout;