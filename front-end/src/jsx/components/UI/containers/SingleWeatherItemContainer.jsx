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
    const navigate = useNavigate();

    const cityName = searchParams.get(CITY_NAME_SEARCH_PARAM_KEY);

    console.log(cityName, weatherData, isLoading, error)

    useEffect(() => {
        if (!weatherData?.list) {
            return;
        }
        const extractedCityWeatherData = weatherData?.list.filter(city => {
            return city.name === cityName;
        });

        if (extractedCityWeatherData.length == 0) {
            navigate(PAGE_NOT_FOUND_PATH, { replace: true });
        }

        setCityWeatherData({ ...extractedCityWeatherData[0] });
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
                            : cityWeatherData?.name ? <ViewWeatherCard
                                city={cityWeatherData}
                                onClickBack={onClickBackhandler}
                            /> : null
                }
            </MainContainer>

        </>
    );

}