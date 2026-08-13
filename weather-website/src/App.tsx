import SearchBar from './components/SearchBar.tsx';
import WeatherCard from './components/WeatherCard.tsx';
import StatCard from './components/StatCard.tsx';
import ForecastDay from './components/ForecastDay.tsx';
import AuthCard from './auth/AuthCard.tsx';

import useWeather from './hooks/useWeather.ts';
import { getWeatherInfo } from './utils/weatherCodes';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from './store/store.ts';
import { setCity } from './store/citySlice.ts';

import { useAuth } from './context/AuthContext.tsx';

function App() {
  const { currentUser, loading: authLoading } = useAuth();

  const city = useSelector((state: RootState) => state.city.value);
  const dispatch = useDispatch<AppDispatch>();

  const { data, loading, error } = useWeather(city);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <AuthCard />;
  }
  return (
    <div>
      <div className="flex justify-end px-4 py-3">
        <p className="text-sm text-gray-600">
          {currentUser.email}
        </p>
      </div>

      <SearchBar
        onSearch={(cityName) => dispatch(setCity(cityName))}
      />

      {loading && (
        <p className="text-center mt-4 text-gray-500">
          Loading…
        </p>
      )}

      {error && (
        <p className="text-center mt-4 text-red-500">
          {error}
        </p>
      )}

      {data && (
        <WeatherCard
          cityName={data.cityName}
          temp={data.temp}
          feelsLike={data.feelsLike}
          weatherCode={data.weatherCode}
        />
      )}

      {data && (
        <div className="max-w-md mx-auto mt-4 grid grid-cols-2 gap-3">
          <StatCard
            icon="💨"
            label="WIND SPEED"
            value={`${Math.round(data.windSpeed)} km/h`}
            subtext=""
          />

          <StatCard
            icon="💧"
            label="HUMIDITY"
            value={`${data.humidity}%`}
            subtext=""
          />

          <StatCard
            icon="☀️"
            label="UV INDEX"
            value={`${Math.round(data.uvIndex)}`}
            subtext=""
          />

          <StatCard
            icon="🧭"
            label="AIR PRESSURE"
            value={`${Math.round(data.pressure)} hPa`}
            subtext=""
          />
        </div>
      )}

      {data && (
        <div className="max-w-md mx-auto mt-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
          <p className="text-xs font-semibold text-gray-400 mb-3">
            7-DAY FORECAST
          </p>

          <div className="grid grid-cols-7 gap-1">
            {data.forecast.map((day, i) => {
              const { icon } = getWeatherInfo(day.weatherCode);

              const dayLabel = new Date(day.date)
                .toLocaleDateString('en-US', {
                  weekday: 'short',
                })
                .toUpperCase();

              return (
                <ForecastDay
                  key={day.date}
                  day={dayLabel}
                  icon={icon}
                  high={`${Math.round(day.high)}`}
                  low={`${Math.round(day.low)}`}
                  active={i === 0}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;