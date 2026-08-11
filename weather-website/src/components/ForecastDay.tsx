function ForecastDay({ day, icon, high, low, active }) {
  return (
    <div
      className={`flex flex-col items-center p-3 rounded-xl 
        ${active ? "bg-blue-100 border border-blue-300" : "bg-gray-50"}`}
    >
      <p className="text-xs font-medium text-gray-500">{day}</p>
      <p className="text-2xl my-2">{icon}</p>
      <p className="text-sm font-semibold text-gray-800">{high}°</p>
      <p className="text-xs text-gray-400">{low}°</p>
    </div>
  );
}

export default ForecastDay;