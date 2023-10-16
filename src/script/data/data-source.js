import movieFetch from '../service/instance';

class DataSource {
  static async searchCoordinate(cityName) {
    try {
      const response = await movieFetch.get('geo/1.0/direct', {
        params: {
          q: cityName,
          limit: 1,
        },
      });
      if (response.data.length) {
        return response.data;
      }
      return new Error(`No coordinates found for ${cityName}`);
    } catch (error) {
      return new Error('Check your internet connection');
    }
  }

  static async getWeatherDetails(latitude, longitude) {
    try {
      const response = await movieFetch.get('data/2.5/forecast', {
        params: {
          lat: latitude,
          lon: longitude,
        },
      });
      return response.data;
    } catch (error) {
      return new Error('Check your internet connection');
    }
  }
}

export default DataSource;
