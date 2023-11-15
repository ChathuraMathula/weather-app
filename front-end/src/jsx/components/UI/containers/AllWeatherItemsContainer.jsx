import React from "react";
import WeatherCard from "../cards/weather_card/WeatherCard";
import { useNavigate } from "react-router-dom";
import { REMOVE_CITY_URL, WEATHER_CARD_VIEW_PATH } from "../../../../js/constants/constants";
import DashboardMainContainer from "./DashboardMainContainer";
import ErrorMessage from "../other/ErrorMessage";
import LoadingSpinner from "../other/LoadingSpinner";
import AddCity from "../forms/add_city/AddCity";

export default function AllWeatherItemsContainer({
    weatherData,
    error,
    isLoading,
    onAddCity,
    onRemoveCity
}) {

    const navigate = useNavigate();

    const onClickWeatherCardHandler = (cityName) => {
        const cityWeatherPath = `${WEATHER_CARD_VIEW_PATH}?city=${cityName}`;
        navigate(cityWeatherPath);
    };

    const onAddCityHandler = (cityCodes) => {
        onAddCity(cityCodes);
    }

    const onRemoveWeatherCardHandler = (cityCode) => {

        const body = {
            cityCode: cityCode
        }

        fetch(REMOVE_CITY_URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then(res => res.json())
            .then(cityCodes => {
                onRemoveCity(cityCodes);
            });
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
                                        key={listItem.id}
                                        city={listItem}
                                        onClickWeatherCard={onClickWeatherCardHandler}
                                        onRemove={onRemoveWeatherCardHandler}
                                        index={i}
                                    />
                                );
                            })
                }
            </DashboardMainContainer>
        </>
    );
}