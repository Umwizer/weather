import { useState, useEffect } from 'react';

type ForecastDayData = {
  date: string;
  weatherCode: number;
  high: number;
  low: number;
};

type WeatherData = {
  temp: number;
  feelsLike: number;
  weatherCode: number;
  cityName: string;
  windSpeed: number;
  humidity: number;
  pressure: number;
  uvIndex: number;
  forecast: ForecastDayData[];
};

function useWeather(city: string) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) return;

    async function fetchWeather() {
      setLoading(true);
      setError(null);

      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
        );
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
          throw new Error('City not found');
        }

        const { latitude, longitude, name } = geoData.results[0];

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
          `&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m,pressure_msl` +
          `&daily=weather_code,temperature_2m_max,temperature_2m_min,uv_index_max` +
          `&timezone=auto`
        );
        const weatherData = await weatherRes.json();

        setData({
          temp: weatherData.current.temperature_2m,
          feelsLike: weatherData.current.apparent_temperature,
          weatherCode: weatherData.current.weather_code,
          cityName: name,
          windSpeed: weatherData.current.wind_speed_10m,
          humidity: weatherData.current.relative_humidity_2m,
          pressure: weatherData.current.pressure_msl,
          uvIndex: weatherData.daily.uv_index_max[0],
          forecast: weatherData.daily.time.map((date: string, i: number) => ({
            date,
            weatherCode: weatherData.daily.weather_code[i],
            high: weatherData.daily.temperature_2m_max[i],
            low: weatherData.daily.temperature_2m_min[i],
          })),
        });
      } catch (err) {
        setError('Could not fetch weather. Try another city.');
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  return { data, loading, error };
}

export default useWeather;