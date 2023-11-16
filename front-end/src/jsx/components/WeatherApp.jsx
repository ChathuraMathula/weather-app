import { useEffect, useState } from 'react'
import '../../css/App.css';

import { fetchCachedWeatherData, cacheWeatherData, isCachedDataExpired } from '../../js/helpers/localStorageHelpers';
import fetchWeatherDataByCityCodes from '../../js/helpers/apiHelpers';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import AllWeatherItemsContainer from './UI/containers/AllWeatherItemsContainer';
import SingleWeatherItemContainer from './UI/containers/SingleWeatherItemContainer';
import ErrorMessage from './UI/other/ErrorMessage';
import { GET_APP_CITY_CODES_URL, ROOT_PATH, WEATHER_CARD_VIEW_PATH } from '../../js/constants/constants';
import MainContainer from './UI/containers/MainContainer';

export default function WeatherApp() {

  const [weatherData, setWeatherData] = useState({});
  const [cityCodes, setCityCodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    if (!isCachedDataExpired()) {
      let cachedWeatherData = fetchCachedWeatherData();
      setWeatherData({ ...cachedWeatherData });
      setIsLoading(false);
      setError(false);
      return;
    }

    setIsLoading(true);

    fetch(GET_APP_CITY_CODES_URL)
      .then(res => res.json())
      .then(cityCodes => {
        if (cityCodes.list.length == 0) {
          return setError("Please add a city.")
        }
        setCityCodes([...cityCodes.list.reverse()]);
      })
      .catch(error => {
        if (error) {
          setError(error.message);
        }
      });
  }, [])

  useEffect(() => {
    if (cityCodes.length > 0) {
      fetchWeatherData();
    }
  }, [cityCodes]);

  const fetchWeatherData = async () => {

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
  };

  const onAddCityHandler = (cityCodes) => {
    if (!cityCodes) {
      setIsLoading(true);
      return;
    }
    setCityCodes([...cityCodes.list.reverse()]);
  }

  const onRemoveCityHandler = (cityCodes) => {
    if (cityCodes.list.length == 0) {
      return setError("Please add a city.")
    }
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


