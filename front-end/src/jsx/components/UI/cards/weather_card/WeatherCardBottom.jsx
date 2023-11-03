import React from "react";
import "../../../../../css/WeatherCardBottom.css";

import wind_direction_icon from "../../../../../images/wind_direction.png";

import { getTimeString } from "../../../../../js/utils/dateUtils";

export default function WeatherCardBottom(props) {

    return (
        <>
            <section className="bottom-section">
                <div>
                    <p><span>Pressure:</span>{` ${props.pressure}hPa`}</p>
                    <p><span>Humidity:</span>{` ${props.humidity}%`}</p>
                    <p><span>Visibility:</span>{` ${(props.visibility / 1000).toFixed(1)}km`}</p>
                </div>
                <div>
                    <img src={wind_direction_icon} alt="wind_direction_icon"></img>
                    <p>{`${props.wind.speed.toFixed(1)}m/s ${props.wind.deg} Degree`}</p>
                </div>
                <div>
                    <p><span>Sunrise:</span>{` ${getTimeString(new Date(props.sunrise * 1000))}`}</p>
                    <p><span>Sunset:</span>{` ${getTimeString(new Date(props.sunset * 1000))}`}</p>
                </div>
            </section>
        </>
    );
}