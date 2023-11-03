import { CACHE_EXPIRE_TIME_IN_MILISECONDS, CACHE_WEATHER_DATA_KEY } from "../constants/constants";

export const cacheWeatherData = (weatherData) => {
    if (!weatherData) {
        return;
    }
    const timespan = Date.now();
    const cachedData = {
        data: weatherData,
        timespan: timespan,
    };

    localStorage.setItem(CACHE_WEATHER_DATA_KEY, JSON.stringify(cachedData));
};

export const fetchCachedWeatherData = () => {

    const cachedData = localStorage.getItem(CACHE_WEATHER_DATA_KEY);
    if (!cachedData) {
        return null;
    }
    const { data, timespan } = JSON.parse(cachedData);

    const currTimeGap = Date.now() - timespan;

    if (currTimeGap > CACHE_EXPIRE_TIME_IN_MILISECONDS) {
        localStorage.removeItem(CACHE_WEATHER_DATA_KEY);
        return null;
    }
    return data;

};