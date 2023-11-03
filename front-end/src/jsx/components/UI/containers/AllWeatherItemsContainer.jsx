import React from "react";
import WeatherCard from "../cards/weather_card/WeatherCard";
import { useNavigate } from "react-router-dom";
import { WEATHER_CARD_VIEW_PATH } from "../../../../js/constants/constants";

export default function AllWeatherItemsContainer(props) {

    const navigate = useNavigate();

    const onClickWeatherCardHandler = (cityName) => {
        const cityWeatherPath = `${WEATHER_CARD_VIEW_PATH}?city=${cityName}`;
        navigate(cityWeatherPath, { replace: true });
    };

    return (
        <>
            {
                props.weatherData.list.map((listItem, i) => {
                    return (
                        <WeatherCard
                            key={listItem.name}
                            city={listItem}
                            onClickWeatherCard={onClickWeatherCardHandler}
                        />
                    );
                })
            }
        </>
    );
}