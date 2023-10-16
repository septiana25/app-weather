import '../component/weather-item.js'
import '../component/search-bar.js';
import DataSource from "../data/data-source.js";

const main = _ => {
  const searchElement = document.querySelector('search-bar');
  const weatherElement = document.querySelector('weather-item');
  const API_KEY = "9f2e1f455e003246d00a9c41b725bbc8";

  const onButtonSearchClicked =  async _ => {
    try {
      const result = await DataSource.searchCoordinate(searchElement.value1, API_KEY);
      const {name, lat, lon} = result[0];
      getWeatherDetails(name, lat, lon);
    } catch (error) {
      fallbackResult(error);
    }
  };

  const getWeatherDetails = async (city, latitude, longitude) => {
    try {
      const result = await DataSource.getWeatherDetails(latitude, longitude, API_KEY);
      console.log(result);
      renderWeather(result);
    } catch (error) {
      fallbackResult(error);
    }
  }

  const renderWeather = result => {
    const uniqueForecasts = [];
    const filterForecasts = result.list.filter(forecast => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueForecasts.includes(forecastDate)) {
            return uniqueForecasts.push(forecastDate);
        }
    });

    const cityName = searchElement.value1;
    weatherElement.weathers = {filterForecasts, cityName};
  };

  const fallbackResult = message => {
    weatherElement.renderError(message);
  };

  searchElement.clickEvent = onButtonSearchClicked;
};

export default main;
