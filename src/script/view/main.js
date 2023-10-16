import '../component/weather-item';
import '../component/search-bar';
import DataSource from '../data/data-source';

const main = () => {
  const searchElement = document.querySelector('search-bar');
  const weatherElement = document.querySelector('weather-item');

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

  const getWeatherDetails = async (latitude, longitude) => {
    try {
      const result = await DataSource.getWeatherDetails(latitude, longitude);
      renderWeather(result);
    } catch (error) {
      fallbackResult(error);
    }
  };

  const onButtonSearchClicked = async () => {
    try {
      const result = await DataSource.searchCoordinate(searchElement.searchValue);
      const { lat, lon } = result[0];
      getWeatherDetails(lat, lon);
    } catch (error) {
      fallbackResult(error);
    }
  };

  searchElement.clickEvent = onButtonSearchClicked;
  searchElement.enterEvent = onButtonSearchClicked;
};

export default main;
