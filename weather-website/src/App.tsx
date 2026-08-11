import { useState } from 'react';
import SearchBar from './components/SearchBar.tsx';
import WeatherCard from './components/WeatherCard.tsx';
import StatCard from './components/StatCard.tsx';
import ForecastDay from './components/ForecastDay.tsx';
import useWeather from './hooks/useWeather.ts';

function App() {
  const [city, setCity] = useState("Kigali");
  const { data, loading, error } = useWeather(city);

  return (
    <div>
      <SearchBar city={city} setCity={setCity} />

      {loading && <p className="text-center mt-4 text-gray-500">Loading…</p>}
      {error && <p className="text-center mt-4 text-red-500">{error}</p>}

      {data && (
        <WeatherCard
          cityName={data.cityName}
          temp={data.temp}
          feelsLike={data.feelsLike}
        />
      )}

      <div className="max-w-md mx-auto mt-4 grid grid-cols-2 gap-3">
        <StatCard icon="💨" label="WIND SPEED" value="14 km/h" subtext="NW gusts" />
        <StatCard icon="💧" label="HUMIDITY" value="62%" subtext="Comfortable" />
        <StatCard icon="☀️" label="UV INDEX" value="6 · High" subtext="Use sunscreen" />
        <StatCard icon="🧭" label="AIR PRESSURE" value="1013 hPa" subtext="Stable" />
      </div>

      <div className="max-w-md mx-auto mt-4 p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
        <p className="text-xs font-semibold text-gray-400 mb-3">7-DAY FORECAST</p>
        <div className="grid grid-cols-7 gap-1">
          <ForecastDay day="TUE" icon="⛅" high="24" low="16" active={true} />
          <ForecastDay day="WED" icon="☀️" high="27" low="18" active={false} />
          <ForecastDay day="THU" icon="☀️" high="28" low="18" active={false} />
          <ForecastDay day="FRI" icon="☁️" high="21" low="14" active={false} />
          <ForecastDay day="SAT" icon="🌧️" high="17" low="11" active={false} />
          <ForecastDay day="SUN" icon="🌦️" high="19" low="12" active={false} />
          <ForecastDay day="MON" icon="☀️" high="23" low="15" active={false} />
        </div>
      </div>
    </div>
  );
}

export default App;