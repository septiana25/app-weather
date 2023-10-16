const axios = require('axios');
class DataSource {
  static async searchCoordinate(cityName, API_KEY) {

    try {
      const response =  await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);
      if (response.data.length) {
        return Promise.resolve(response.data);
      } else {
        return Promise.reject(`No coordinates found for ${cityName}`);
      }
    } catch (error) { 
      return Promise.reject('Check your internet connection');
    }
  };

  static async getWeatherDetails(latitude, longitude, API_KEY) {
    try {
      const response =  await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
      return Promise.resolve(response.data);
    } catch (error) {
      return Promise.reject('Check your internet connection');
    }
  }
};

export default DataSource;