
function WeatherCard() {
  return (
    <div className="max-w-md mx-auto mt-4 p-6 rounded-2xl bg-linear-to-br bg-blue-500 text-white shadow-lg">
      <div className="flex justify-between items-start">
      <div>
        <h2 className="text-lg font-semibold">Kigali, ES</h2>
        <p className="text-sm text-blue-100">Tuesday,11/August/2026</p>
      </div>
      <div>
          <span className="text-5xl font-bold">24°C</span>
      </div>
      </div>
      <div className="flex justify-between items-end mt-6">
        <div>
          <p className="text-3xl">🌥️</p>
          <p className="text-sm text-blue-100 mt-1">Partly Cloudy</p>
        </div>
        <p className="text-sm text-blue-100">Feels like 22°C</p>
      </div>
    </div>
  );
}
export default WeatherCard;