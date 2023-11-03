import React from "react";
import "../../../../../css/WeatherCard.css";

import WeatherCardBottom from "./WeatherCardBottom";

import { getRandomHSLColor } from "../../../../../js/utils/colorUtils.js";
import WeatherCardTop from "./WeatherCardTop";

export default function WeatherCard(props) {

    const city = props.city;
    const date = new Date(city.dt * 1000);

    const onClickWeatherCardkHandler = (cityName) => {
        props.onClickWeatherCard(cityName);
    }

    return (
        <>
            <div key={city.name} className="weather-card__container"
                style={{ backgroundColor: getRandomHSLColor(city.name) }}
                onClick={() => onClickWeatherCardkHandler(city.name)}>
                <WeatherCardTop
                    cityName={city.name}
                    country={city.sys.country}
                    date={date}
                    weatherDescription={city.weather[0].description}
                    temperature={city.main.temp}
                    minimumTemperature={city.main.temp_min}
                    maximumTemperature={city.main.temp_max}
                    weatherIconName={city.weather[0].icon}
                />
                <WeatherCardBottom
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