import SearchBar from './components/SearchBar.tsx';
import WeatherCard from './components/WeatherCard.tsx';
import StatCard from './components/StatCard.tsx';
function App(){
  return (
    <div>
      <SearchBar/>
      <WeatherCard/>
      <div className="max-w-md mx-auto mt-4 grid grid-cols-2 gap-3">
         <StatCard icon="💨" label="WIND SPEED" value="14 km/h" subtext="NW gusts" />
         <StatCard icon="💧" label="HUMIDITY" value="62%" subtext="Comfortable" />
         <StatCard icon="☀️" label="UV INDEX" value="6 · High" subtext="Use sunscreen" />
          <StatCard icon="🧭" label="AIR PRESSURE" value="1013 hPa" subtext="Stable" />
</div>
    </div>
  )
}
export default App;