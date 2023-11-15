import React, { useEffect, useState } from "react";
import ViewWeatherCard from "../cards/view_weather_card/ViewWeatherCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CITY_NAME_SEARCH_PARAM_KEY, PAGE_NOT_FOUND_PATH, ROOT_PATH } from "../../../../js/constants/constants";
import MainContainer from "./MainContainer";
import ErrorMessage from "../other/ErrorMessage";
import LoadingSpinner from "../other/LoadingSpinner";

export default function SingleWeatherItemContainer({ weatherData, error, isLoading }) {

    const [searchParams] = useSearchParams();
    const [cityWeatherData, setCityWeatherData] = useState({});
    const [weatherCardIndex, setWeatherCardIndex] = useState(0);
    const navigate = useNavigate();

    const cityName = searchParams.get(CITY_NAME_SEARCH_PARAM_KEY);

    useEffect(() => {
        if (!weatherData?.list) {
            return;
        }

        const weatherDataArray = weatherData.list;

        let isCityExists;
        for (let i = 0; i < weatherDataArray.length; i++) {
            const cityData = weatherDataArray[i];
            if (cityData.name == cityName) {
                setWeatherCardIndex(i);
                setCityWeatherData({ ...cityData })
                isCityExists = true;
                break;
            }
        }

        if (!isCityExists) {
            navigate(PAGE_NOT_FOUND_PATH, { replace: true });
        }

    }, [isLoading, error]);


    const onClickBackhandler = () => {
        navigate(ROOT_PATH, { replace: true });
    };

    return (
        <>
            <MainContainer>
                {
                    error
                        ? <ErrorMessage error={error} />
                        : isLoading
                            ? <LoadingSpinner />
                            : cityWeatherData?.name
                                ? <ViewWeatherCard
                                    city={cityWeatherData}
                                    onClickBack={onClickBackhandler}
                                    index={weatherCardIndex}
                                />
                                : null
                }
            </MainContainer>

        </>
    );

}