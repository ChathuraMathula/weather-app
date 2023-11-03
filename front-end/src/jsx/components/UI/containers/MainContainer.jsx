import React from "react";

import "../../../../css/MainContainer.css";

export default function MainContainer(props) {

    return (
        <main className="main-container">
            {props.children}
        </main>
    );
}