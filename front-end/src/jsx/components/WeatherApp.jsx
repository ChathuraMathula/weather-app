import { useEffect, useMemo, useState } from 'react'
import '../../css/App.css';

import cities from "../../json/cities.json";

import { fetchCachedWeatherData, cacheWeatherData } from '../../js/helpers/localStorageHelpers';
import fetchWeatherDataByCityCodes from '../../js/helpers/apiHelpers';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import AllWeatherItemsContainer from './UI/containers/AllWeatherItemsContainer';
import SingleWeatherItemContainer from './UI/containers/SingleWeatherItemContainer';
import ErrorMessage from './UI/other/ErrorMessage';
import { GET_APP_CITY_CODES_URL, PAGE_NOT_FOUND_PATH, ROOT_PATH, WEATHER_CARD_VIEW_PATH } from '../../js/constants/constants';
import MainContainer from './UI/containers/MainContainer';

// const cityCodes = cities.List.map(city => city.CityCode);

export default function WeatherApp() {

  const [weatherData, setWeatherData] = useState({});
  const [cityCodes, setCityCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // const cityCodes = useMemo(() => {
  //   return cities.List.map(city => city.CityCode);
  // }, []);

  useEffect(() => {
    fetch(GET_APP_CITY_CODES_URL)
      .then(res => res.json())
      .then(cityCodes => {
        console.log(cityCodes)
        setCityCodes([...cityCodes.list.reverse()]);
      })
  }, [])

  useEffect(() => {
    if (cityCodes.length > 0) {
      fetchWeatherData();
    }
  }, [cityCodes]);

  const fetchWeatherData = async () => {

    let cachedWeatherData = fetchCachedWeatherData();

    if (!cachedWeatherData) {
      setIsLoading(true);
      await fetchWeatherDataByCityCodes(cityCodes)
        .then(latestWeatherData => {
          cacheWeatherData(latestWeatherData);
          setWeatherData({ ...latestWeatherData });
          setIsLoading(false);
          setError(false);
        })
        .catch(error => {
          if (error) {
            setError(error.message);
          }
        });

    } else {
      setWeatherData({ ...cachedWeatherData });
      setIsLoading(false);
      setError(false);
    }
  };

  const onAddCityHandler = (cityCodes) => {
    setCityCodes([...cityCodes.list.reverse()]);
  }

  const onRemoveCityHandler = (cityCodes) => {
    setCityCodes([...cityCodes.list.reverse()]);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path={ROOT_PATH}
            element={
              <AllWeatherItemsContainer
                error={error}
                isLoading={isLoading}
                weatherData={weatherData}
                onAddCity={onAddCityHandler}
                onRemoveCity={onRemoveCityHandler}
              />
            }
          />
          <Route
            path={WEATHER_CARD_VIEW_PATH}
            element={
              <SingleWeatherItemContainer
                error={error}
                isLoading={isLoading}
                weatherData={weatherData}
              />
            }
          />
          <Route
            path='*'
            element={
              <MainContainer>
                <ErrorMessage error={"404 - Oops, This Page Doesn't Exist."} />
              </MainContainer>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );



}


