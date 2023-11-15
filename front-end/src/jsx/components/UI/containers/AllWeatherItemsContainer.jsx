import React from "react";
import WeatherCard from "../cards/weather_card/WeatherCard";
import { useNavigate } from "react-router-dom";
import { WEATHER_CARD_VIEW_PATH } from "../../../../js/constants/constants";
import DashboardMainContainer from "./DashboardMainContainer";
import ErrorMessage from "../other/ErrorMessage";
import LoadingSpinner from "../other/LoadingSpinner";
import AddCity from "../other/AddCity";

export default function AllWeatherItemsContainer({ weatherData, error, isLoading, onAddCity }) {

    const navigate = useNavigate();

    const onClickWeatherCardHandler = (cityName) => {
        const cityWeatherPath = `${WEATHER_CARD_VIEW_PATH}?city=${cityName}`;
        navigate(cityWeatherPath, { replace: true });
    };

    const onAddCityHandler = (cityCodes) => {
        onAddCity(cityCodes);
    }
    return (
        <>
            <AddCity onAddCity={onAddCityHandler} />
            <DashboardMainContainer>
                {
                    error
                        ? <ErrorMessage error={error} />
                        : isLoading
                            ? <LoadingSpinner />
                            : weatherData.list.map((listItem, i) => {
                                return (
                                    <WeatherCard
                                        key={listItem.name}
                                        city={listItem}
                                        onClickWeatherCard={onClickWeatherCardHandler}
                                    />
                                );
                            })
                }
            </DashboardMainContainer>
        </>
    );
}