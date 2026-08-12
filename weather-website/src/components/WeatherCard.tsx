import { getWeatherInfo } from '../utils/weatherCodes';

type WeatherCardProps = {
  cityName: string;
  temp: number;
  feelsLike: number;
  weatherCode: number;
};

function WeatherCard({ cityName, temp, feelsLike, weatherCode }: WeatherCardProps) {
  const { label, icon } = getWeatherInfo(weatherCode);

  return (
    <div className="max-w-md mx-auto mt-4 p-6 rounded-2xl bg-linear-to-br bg-blue-500 text-white shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold">{cityName}</h2>
        </div>
        <div>
          <span className="text-5xl font-bold">{Math.round(temp)}°C</span>
        </div>
      </div>
      <div className="flex justify-between items-end mt-6">
        <div>
          <p className="text-3xl">{icon}</p>
          <p className="text-sm text-blue-100 mt-1">{label}</p>
        </div>
        <p className="text-sm text-blue-100">Feels like {Math.round(feelsLike)}°C</p>
      </div>
    </div>
  );
}

export default WeatherCard;