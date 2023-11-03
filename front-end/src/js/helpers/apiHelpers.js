import { WEATHER_API_BASE_URL, WEATHER_API_KEY, WEATHER_API_UNITS } from "../constants/constants";


export default async function fetchWeatherDataByCityCodes(cityCodes) {

    if (cityCodes?.length > 0) {
        try {
            const cityCodesString = cityCodes.join();

            const weatherApiUrl =
                `${WEATHER_API_BASE_URL}?id=${cityCodesString}&units=${WEATHER_API_UNITS}&appid=${WEATHER_API_KEY}`;

            const response = await fetch(weatherApiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} (${response.statusText})`);
            }

            const weatherData = response.json();
            return weatherData;

        } catch (error) {
            throw error;
        }
    }

}
