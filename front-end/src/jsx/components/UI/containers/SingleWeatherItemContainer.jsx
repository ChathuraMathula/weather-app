import React, { useEffect, useState } from "react";
import ViewWeatherCard from "../cards/view_weather_card/ViewWeatherCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CITY_NAME_SEARCH_PARAM_KEY, PAGE_NOT_FOUND_PATH, ROOT_PATH } from "../../../../js/constants/constants";

export default function SingleWeatherItemContainer({ weatherData }) {

    const [searchParams] = useSearchParams();
    const [cityWeatherData, setCityWeatherData] = useState({});
    const navigate = useNavigate();

    const cityName = searchParams.get(CITY_NAME_SEARCH_PARAM_KEY);

    useEffect(() => {

        const extractedCityWeatherData = weatherData?.list.filter(city => {
            return city.name === cityName;
        });

        if (extractedCityWeatherData.length == 0) {
            navigate(PAGE_NOT_FOUND_PATH, { replace: true });
        }

        setCityWeatherData({ ...extractedCityWeatherData[0] });
    }, []);


    const onClickBackhandler = () => {
        navigate(ROOT_PATH, { replace: true });
    };

    if (cityWeatherData?.name) {
        return (
            <>
                <ViewWeatherCard
                    city={cityWeatherData}
                    onClickBack={onClickBackhandler}
                />
            </>
        );
    }
}