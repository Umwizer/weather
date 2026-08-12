
type WeatherInfo = {
  label: string;
  icon: string;
};

const weatherCodeMap: Record<number, WeatherInfo> = {
  0: { label: "Clear Sky", icon: "☀️" },
  1: { label: "Mostly Clear", icon: "🌤️" },
  2: { label: "Partly Cloudy", icon: "🌥️" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Fog", icon: "🌫️" },
  61: { label: "Light Rain", icon: "🌦️" },
  63: { label: "Rain", icon: "🌧️" },
  71: { label: "Snow", icon: "🌨️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
};

export function getWeatherInfo(code: number): WeatherInfo {
  return weatherCodeMap[code] || { label: "Unknown", icon: "❓" };
}