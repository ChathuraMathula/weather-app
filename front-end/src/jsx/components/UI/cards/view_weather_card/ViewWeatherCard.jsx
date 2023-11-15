import React from "react";
import "../../../../../css/ViewWeatherCard.css";

import { getColor } from "../../../../../js/utils/colorUtils";

import ViewWeatherCardBottom from "./ViewWeatherCardBottom";
import ViewWeatherCardTop from "./ViewWeatherCardTop";
import BackButton from "../../buttons/BackButton";


export default function ViewWeatherCard({ city, onClickBack, index }) {

    const date = new Date(city.dt * 1000);

    const onClickBackHandler = (e) => {
        onClickBack(true);
    };

    return (
        <>
            <div className="view-weather-card__container"
                style={{ backgroundColor: getColor(index) }}>

                <BackButton onClick={onClickBackHandler} />
                <ViewWeatherCardTop
                    cityName={city.name}
                    country={city.sys.country}
                    date={date}
                    weatherDescription={city.weather[0].description}
                    temperature={city.main.temp}
                    minimumTemperature={city.main.temp_min}
                    maximumTemperature={city.main.temp_max}
                    weatherIconName={city.weather[0].icon}
                />
                <ViewWeatherCardBottom
                    pressure={city.main.pressure}
                    humidity={city.main.humidity}
                    visibility={city.visibility}
                    wind={city.wind}
                    sunrise={city.sys.sunrise}
                    sunset={city.sys.sunset}
                />
            </div>
        </>
    );
}