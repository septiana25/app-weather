import '../component/weather-item';
import '../component/search-bar';
import DataSource from '../data/data-source';

const main = () => {
  const searchElement = document.querySelector('search-bar');
  const weatherElement = document.querySelector('weather-item');
  const API_KEY = '9f2e1f455e003246d00a9c41b725bbc8';

  const renderWeather = (result) => {
    const uniqueForecasts = [];
    const filterForecasts = result.list.filter((forecast) => {
      const forecastDate = new Date(forecast.dt_txt).getDate();
      if (!uniqueForecasts.includes(forecastDate)) {
        return uniqueForecasts.push(forecastDate);
      }
      return false;
    });

    const cityName = searchElement.searchValue;
    weatherElement.weathers = { filterForecasts, cityName };
  };

  const fallbackResult = (message) => {
    weatherElement.renderError(message);
  };

  const getWeatherDetails = async (city, latitude, longitude) => {
    try {
      const result = await DataSource.getWeatherDetails(latitude, longitude, API_KEY);
      renderWeather(result);
    } catch (error) {
      fallbackResult(error);
    }
  };

  const onButtonSearchClicked = async () => {
    try {
      const result = await DataSource.searchCoordinate(searchElement.searchValue, API_KEY);
      const { name, lat, lon } = result[0];
      getWeatherDetails(name, lat, lon);
    } catch (error) {
      fallbackResult(error);
    }
  };

  searchElement.clickEvent = onButtonSearchClicked;
  searchElement.enterEvent = onButtonSearchClicked;
};

export default main;
