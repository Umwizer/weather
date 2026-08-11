# Weathervane

A simple weather lookup app built with React, TypeScript, and Tailwind CSS.
Search any city and see current conditions, pulled live from a free weather API.

Built as a learning project — UI first with hardcoded data, then wired up to
real data using a custom hook.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** (build tool, with the React Compiler babel preset enabled)
- **Tailwind CSS v4** (via `@tailwindcss/vite`, no PostCSS config needed)
- **Open-Meteo API** — free, no API key required
  - Geocoding endpoint: turns a city name into coordinates
  - Forecast endpoint: turns coordinates into weather data

## Project structure

```
src/
  components/
    SearchBar.tsx      # controlled input + form; lifts the submitted city up via onSearch
    WeatherCard.tsx     # hero card: city name, temperature, feels-like
    StatCard.tsx        # reusable small stat tile (wind, humidity, UV, pressure)
    ForecastDay.tsx     # reusable single day in the 7-day forecast strip
  hooks/
    useWeather.ts       # custom hook: fetches geocoding + forecast data for a given city
  App.tsx               # composes everything, owns the "city" state
```

## How data flows

1. User types a city in `SearchBar` (local `draft` state, updates per keystroke).
2. On submit (Enter or button), `SearchBar` calls `onSearch(city)`, which is
   `App`'s `setCity` passed down as a prop.
3. `App` calls `useWeather(city)`. Its internal `useEffect` re-runs any time
   `city` changes.
4. `useWeather` fetches from Open-Meteo in two steps: geocode the city name,
   then fetch current conditions for those coordinates. Returns
   `{ data, loading, error }`.
5. `App` passes `data` down to `WeatherCard` as props. Loading and error
   states are rendered conditionally above it.

## Setup

```bash
npm install
npm run dev
```

Requires Node.js. No API keys or `.env` file needed — Open-Meteo is free
and unauthenticated.

## Known limitations / what's next

- [ ] Weather condition (e.g. "Partly Cloudy") and icon are still hardcoded —
      need to fetch and map the API's `weather_code` field.
- [ ] Date under the city name isn't wired up yet.
- [ ] Stat cards (wind speed, humidity, UV index, air pressure) are still
      hardcoded placeholder values.
- [ ] 7-day forecast strip is still hardcoded — needs the `daily` part of
      the forecast response, rendered with `.map()` instead of by hand.
- [ ] No loading skeleton — currently just a plain "Loading…" line.
- [ ] No handling yet for the "Locate" button actually using geolocation.

## Notes on the setup (things that tripped me up)

- Tailwind v4 does **not** use `tailwind.config.js` or the old
  `@tailwind base/components/utilities` directives. The CSS file just needs
  `@import "tailwindcss";`, and the Vite plugin (`@tailwindcss/vite`) must be
  registered in `vite.config.ts` — installing the package alone isn't enough.
- The project uses a custom Babel plugin for the React Compiler. Because of
  that, Babel (not just Vite/tsc) processes `.tsx` files, so
  `@babel/preset-typescript` must be included in its presets, or TypeScript
  syntax like `type X = {...}` fails to parse. Installed as `^7` to match
  the project's existing `@babel/core` v7.