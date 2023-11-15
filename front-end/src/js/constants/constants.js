
export const APP_HEADING = "Weather App";

export const FOOTER_DESCRIPTION = "© 2023 | Chathura Ekanayake";

export const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const WEATHER_API_UNITS = "metric";

export const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5/group";

export const WEATHER_ICON_BASE_URL = "https://openweathermap.org/img/wn";

export const CACHE_EXPIRE_TIME_IN_MILISECONDS = 5 * 60 * 1000;

export const CACHE_WEATHER_DATA_KEY = "cachedWeatherData";

export const ROOT_PATH = "/";

export const WEATHER_CARD_VIEW_PATH = "/view";

export const PAGE_NOT_FOUND_PATH = "/404"

export const CITY_NAME_SEARCH_PARAM_KEY = "city";

export const BACK_END_HOST_URL = "http://localhost:3001";

export const GET_CITIES_BY_NAME_URL = `${BACK_END_HOST_URL}/api/cities`;

export const ADD_CITY_URL = `${BACK_END_HOST_URL}/api/app/city`;

export const REMOVE_CITY_URL = `${BACK_END_HOST_URL}/api/app/city`;

export const GET_APP_CITY_CODES_URL = `${BACK_END_HOST_URL}/api/app/cities`;