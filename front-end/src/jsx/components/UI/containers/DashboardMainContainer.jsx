import React from "react";

import "../../../../css/DashboardMainContainer.css";

export default function DashboardMainContainer(props) {

    return (
        <main className="dashboard__main-container">
            {props.children}
        </main>
    );
}