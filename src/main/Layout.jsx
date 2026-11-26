import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import {
    MediaContext,
    UserMediaContext,
    SelectedUserContext
} from "./Context.jsx";

function Layout() {
    const testArr = [
        {
            name: "Serial Experiments Lain",
            id: "sel",
            image: "https://upload.wikimedia.org/wikipedia/en/3/32/Serial_Experiments_Lain_DVD_vol_1.jpg",
            description: "1996 anime"
        },
        {
            name: "Come In",
            id: "comeinweatherday",
            image: "https://t2.genius.com/unsafe/861x861/https%3A%2F%2Fimages.genius.com%2Fa414dc591550f011823d77397b6b7e2e.1000x1000x1.jpg",
            description: "Album by Weatherday"
        },
        {
            name: "Six of Crows",
            id: "sixofcrows",
            image: "https://upload.wikimedia.org/wikipedia/en/1/10/Six_of_Crows_by_Leigh_Bardugo_book_cover.jpeg",
            description: "Book by Leigh Bardugo"
        },
        {
            name: "Celeste",
            id: "celeste",
            image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Celeste_box_art_full.png/500px-Celeste_box_art_full.png",
            description: "Game by Maddy Thorson"
        }
    ];

    const [media, setMedia] = useState(() => {
        const saved = localStorage.getItem("SessionMedia");
        return saved ? JSON.parse(saved) : testArr;
    });

    const [usermedia, setUsermedia] = useState(() => {
        const saved = localStorage.getItem("UserMedia");

        return saved ? JSON.parse(saved) : [
            { user: "Aubrey", list: testArr },
            { user: "Luna", list: testArr },
            { user: "Tatianna", list: testArr }
        ];
    });

    const [selectedUser, setSelectedUser] = useState(() => {
    return localStorage.getItem("SelectedUser") || "Aubrey";
});

useEffect(() => {
    localStorage.setItem("SelectedUser", selectedUser);
}, [selectedUser]);

    useEffect(() => {
        localStorage.setItem("SessionMedia", JSON.stringify(media));
    }, [media]);

    useEffect(() => {
        localStorage.setItem("UserMedia", JSON.stringify(usermedia));
    }, [usermedia]);

    return (
    <MediaContext.Provider value={[media, setMedia]}>
        <UserMediaContext.Provider value={[usermedia, setUsermedia]}>
            <SelectedUserContext.Provider value={[selectedUser, setSelectedUser]}>
                <Outlet />
            </SelectedUserContext.Provider>
        </UserMediaContext.Provider>
    </MediaContext.Provider>
);
}

export default Layout;