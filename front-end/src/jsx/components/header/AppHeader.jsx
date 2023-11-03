import React from "react";
import weatherAppIcon from "../../../images/weather_app_icon.png";
import { APP_HEADING, ROOT_PATH } from "../../../js/constants/constants";

import "../../../css/AppHeader.css";
import { useNavigate } from "react-router";

export default function AppHeader(props) {

    const navigate = useNavigate();

    const onClickHeadingHandler = (event) => {
        navigate(ROOT_PATH, { replace: true });
    }

    return (
        <h1 className='weather-app__heading' onClick={onClickHeadingHandler}>
            <img src={weatherAppIcon} alt='weather app icon'></img>
            <span>{APP_HEADING}</span>
        </h1>
    );
}