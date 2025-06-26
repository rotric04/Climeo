"use client";
import React from "react";

function MainComponent() {
  const [weather, setWeather] = React.useState(null);
  const [location, setLocation] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [searchInput, setSearchInput] = React.useState("");
  const [activeDay, setActiveDay] = React.useState(0);
  const [viewMode, setViewMode] = React.useState("overview");
  const [selectedHour, setSelectedHour] = React.useState(null);

  // Mock comprehensive weather data
  const mockWeatherData = {
    location: {
      name: "New York",
      region: "New York",
      country: "United States",
      lat: 40.7128,
      lon: -74.006,
      localtime: "2025-01-27 14:30",
    },
    current: {
      temp_c: 8,
      temp_f: 46,
      condition: {
        text: "Partly cloudy",
        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
      },
      wind_kph: 15,
      wind_dir: "NW",
      humidity: 65,
      uv: 4,
      vis_km: 16,
      pressure_mb: 1013,
      feelslike_c: 5,
      air_quality: {
        co: 233.4,
        no2: 15.8,
        o3: 89.2,
        so2: 7.3,
        pm2_5: 12.1,
        pm10: 18.7,
        us_epa_index: 2,
        gb_defra_index: 3,
      },
    },
    forecast: {
      forecastday: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() + i * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        day: {
          maxtemp_c: 12 + Math.random() * 10,
          mintemp_c: 2 + Math.random() * 8,
          avgtemp_c: 7 + Math.random() * 8,
          condition: {
            text: [
              "Sunny",
              "Partly cloudy",
              "Cloudy",
              "Light rain",
              "Heavy rain",
            ][Math.floor(Math.random() * 5)],
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
          },
          maxwind_kph: 10 + Math.random() * 20,
          totalprecip_mm: Math.random() * 5,
          avghumidity: 50 + Math.random() * 30,
          daily_will_it_rain: Math.random() > 0.7 ? 1 : 0,
          daily_chance_of_rain: Math.floor(Math.random() * 100),
          uv: Math.floor(Math.random() * 10) + 1,
        },
        astro: {
          sunrise: "06:45 AM",
          sunset: "05:30 PM",
          moonrise: "08:15 PM",
          moonset: "07:30 AM",
          moon_phase: [
            "New Moon",
            "Waxing Crescent",
            "First Quarter",
            "Waxing Gibbous",
            "Full Moon",
            "Waning Gibbous",
            "Last Quarter",
            "Waning Crescent",
          ][Math.floor(Math.random() * 8)],
          moon_illumination: Math.floor(Math.random() * 100),
        },
        hour: Array.from({ length: 24 }, (_, h) => ({
          time: `${
            new Date(Date.now() + i * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0]
          } ${h.toString().padStart(2, "0")}:00`,
          temp_c: 5 + Math.random() * 10,
          condition: {
            text: ["Clear", "Partly cloudy", "Cloudy", "Light rain"][
              Math.floor(Math.random() * 4)
            ],
            icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
          },
          wind_kph: 5 + Math.random() * 15,
          wind_dir: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][
            Math.floor(Math.random() * 8)
          ],
          humidity: 40 + Math.random() * 40,
          chance_of_rain: Math.floor(Math.random() * 100),
          uv: h > 6 && h < 18 ? Math.floor(Math.random() * 8) + 1 : 0,
          feelslike_c: 3 + Math.random() * 12,
        })),
      })),
    },
    alerts: [
      {
        headline: "Winter Weather Advisory",
        msgtype: "Alert",
        severity: "Moderate",
        urgency: "Expected",
        areas: "New York Metro Area",
        category: "Met",
        certainty: "Likely",
        event: "Winter Weather Advisory",
        note: "Snow and ice expected. Travel may be difficult.",
        effective: "2025-01-27T18:00:00-05:00",
        expires: "2025-01-28T06:00:00-05:00",
        desc: "A winter weather advisory is in effect from 6 PM today to 6 AM tomorrow. Expect 2-4 inches of snow with icy conditions on roads.",
      },
    ],
  };

  React.useEffect(() => {
    setWeather(mockWeatherData);
    setLocation(mockWeatherData.location.name);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeather(searchInput.trim());
      setSearchInput("");
    }
  };

  const fetchWeather = async (location) => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${location}`
      );
      const data = await response.json();
      setWeather(data);
      setLocation(location);
    } catch (error) {
      setError(error);
    }
  };

  const getWeatherEmoji = (condition) => {
    const text = condition?.text?.toLowerCase() || "";
    if (text.includes("sunny") || text.includes("clear")) return "☀️";
    if (text.includes("cloud")) return "☁️";
    if (text.includes("rain")) return "🌧️";
    if (text.includes("snow")) return "❄️";
    if (text.includes("storm") || text.includes("thunder")) return "⛈️";
    if (text.includes("fog") || text.includes("mist")) return "🌫️";
    return "🌤️";
  };

  const getMoonEmoji = (phase) => {
    const phases = {
      "New Moon": "🌑",
      "Waxing Crescent": "🌒",
      "First Quarter": "🌓",
      "Waxing Gibbous": "🌔",
      "Full Moon": "🌕",
      "Waning Gibbous": "🌖",
      "Last Quarter": "🌗",
      "Waning Crescent": "🌘",
    };
    return phases[phase] || "🌙";
  };

  const getUVLevel = (uv) => {
    if (uv <= 2)
      return { level: "Low", color: "text-green-400", bg: "bg-green-500/20" };
    if (uv <= 5)
      return {
        level: "Moderate",
        color: "text-yellow-400",
        bg: "bg-yellow-500/20",
      };
    if (uv <= 7)
      return {
        level: "High",
        color: "text-orange-400",
        bg: "bg-orange-500/20",
      };
    if (uv <= 10)
      return { level: "Very High", color: "text-red-400", bg: "bg-red-500/20" };
    return {
      level: "Extreme",
      color: "text-purple-400",
      bg: "bg-purple-500/20",
    };
  };

  const getAQILevel = (aqi) => {
    if (aqi <= 1)
      return { level: "Good", color: "text-green-400", bg: "bg-green-500/20" };
    if (aqi <= 2)
      return {
        level: "Moderate",
        color: "text-yellow-400",
        bg: "bg-yellow-500/20",
      };
    if (aqi <= 3)
      return {
        level: "Unhealthy for Sensitive",
        color: "text-orange-400",
        bg: "bg-orange-500/20",
      };
    if (aqi <= 4)
      return { level: "Unhealthy", color: "text-red-400", bg: "bg-red-500/20" };
    return {
      level: "Very Unhealthy",
      color: "text-purple-400",
      bg: "bg-purple-500/20",
    };
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return "Today";
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    return date.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  if (!weather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  const currentDay = weather.forecast.forecastday[activeDay];
  const uvInfo = getUVLevel(weather.current.uv);
  const aqiInfo = getAQILevel(weather.current.air_quality.us_epa_index);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white font-inter">
      {/* Header */}
      <header className="p-6 backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl animate-bounce">🌦️</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Weather Forecast Pro
              </h1>
              <p className="text-white/70 text-sm">
                Professional weather insights
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="text-white/70 hover:text-white transition-colors"
            >
              Weather
            </a>
            <a
              href="/vibes"
              className="text-white/70 hover:text-white transition-colors"
            >
              Vibes Hub
            </a>
            <a
              href="/forecast"
              className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
            >
              Forecast Pro
            </a>
            <a
              href="/about"
              className="text-white/70 hover:text-white transition-colors"
            >
              About
            </a>
          </nav>

          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search location..."
              className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 w-64"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 font-semibold"
            >
              Search
            </button>
          </form>
        </div>
      </header>

      {/* Weather Alerts */}
      {weather.alerts && weather.alerts.length > 0 && (
        <div className="max-w-7xl mx-auto p-6">
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-md border border-red-500/50 rounded-2xl p-4 animate-pulse-glow">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">⚠️</span>
              <h3 className="text-lg font-bold text-red-300">Weather Alert</h3>
            </div>
            <p className="text-red-200 font-semibold">
              {weather.alerts[0].headline}
            </p>
            <p className="text-red-100 text-sm mt-1">
              {weather.alerts[0].desc}
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Current Weather Overview */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 rounded-3xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current Conditions */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-4xl font-bold mb-2">
                    {weather.location.name}
                  </h2>
                  <p className="text-white/70">
                    {weather.location.region}, {weather.location.country}
                  </p>
                  <p className="text-white/50 text-sm">
                    {weather.location.localtime}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-6xl mb-2">
                    {getWeatherEmoji(weather.current.condition)}
                  </div>
                  <p className="text-white/70">
                    {weather.current.condition.text}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">
                    {Math.round(weather.current.temp_c)}°
                  </div>
                  <div className="text-xs text-white/70">Temperature</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">
                    {Math.round(weather.current.feelslike_c)}°
                  </div>
                  <div className="text-xs text-white/70">Feels Like</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">
                    {weather.current.humidity}%
                  </div>
                  <div className="text-xs text-white/70">Humidity</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold">
                    {weather.current.wind_kph}
                  </div>
                  <div className="text-xs text-white/70">Wind km/h</div>
                </div>
              </div>
            </div>

            {/* Air Quality & UV */}
            <div className="space-y-4">
              <div
                className={`${aqiInfo.bg} rounded-xl p-4 border border-white/20`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/70">Air Quality</span>
                  <span className="text-2xl">🌬️</span>
                </div>
                <div className={`text-2xl font-bold ${aqiInfo.color}`}>
                  {aqiInfo.level}
                </div>
                <div className="text-xs text-white/70">
                  AQI: {weather.current.air_quality.us_epa_index}
                </div>
              </div>

              <div
                className={`${uvInfo.bg} rounded-xl p-4 border border-white/20`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/70">UV Index</span>
                  <span className="text-2xl">☀️</span>
                </div>
                <div className={`text-2xl font-bold ${uvInfo.color}`}>
                  {uvInfo.level}
                </div>
                <div className="text-xs text-white/70">
                  UV: {weather.current.uv}
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/70">Visibility</span>
                  <span className="text-2xl">👁️</span>
                </div>
                <div className="text-2xl font-bold">
                  {weather.current.vis_km} km
                </div>
                <div className="text-xs text-white/70">
                  Pressure: {weather.current.pressure_mb} mb
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View Mode Tabs */}
        <div className="flex space-x-2 bg-white/10 backdrop-blur-md rounded-2xl p-2">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "hourly", label: "Hourly", icon: "⏰" },
            { id: "details", label: "Details", icon: "🔍" },
            { id: "astronomy", label: "Astronomy", icon: "🌙" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setViewMode(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                viewMode === tab.id
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              <span>{tab.icon}</span>
              <span className="font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 7-Day Forecast */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <span className="mr-3">📅</span>
            7-Day Forecast
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {weather.forecast.forecastday.map((day, index) => (
              <button
                key={index}
                onClick={() => setActiveDay(index)}
                className={`p-4 rounded-xl transition-all duration-300 text-center ${
                  activeDay === index
                    ? "bg-gradient-to-b from-cyan-500/30 to-purple-500/30 border-2 border-cyan-400"
                    : "bg-white/10 hover:bg-white/20 border border-white/20"
                }`}
              >
                <div className="text-sm text-white/70 mb-2">
                  {formatDate(day.date)}
                </div>
                <div className="text-3xl mb-2">
                  {getWeatherEmoji(day.day.condition)}
                </div>
                <div className="text-lg font-bold">
                  {Math.round(day.day.maxtemp_c)}°
                </div>
                <div className="text-sm text-white/70">
                  {Math.round(day.day.mintemp_c)}°
                </div>
                <div className="text-xs text-white/50 mt-1">
                  {day.day.daily_chance_of_rain}%
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Content Based on View Mode */}
        {viewMode === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Temperature Chart */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">📈</span>
                Temperature Trend
              </h4>
              <div className="h-48 flex items-end justify-between space-x-1">
                {currentDay.hour
                  .filter((_, i) => i % 3 === 0)
                  .map((hour, index) => {
                    const height = ((hour.temp_c + 10) / 30) * 100;
                    return (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div className="text-xs text-white/70 mb-1">
                          {Math.round(hour.temp_c)}°
                        </div>
                        <div
                          className="w-full bg-gradient-to-t from-cyan-500 to-purple-500 rounded-t-lg transition-all duration-1000"
                          style={{ height: `${height}%` }}
                        ></div>
                        <div className="text-xs text-white/50 mt-1">
                          {formatTime(hour.time)}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Wind & Precipitation */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">💨</span>
                Wind & Rain
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">💨</span>
                    <div>
                      <div className="font-semibold">Wind Speed</div>
                      <div className="text-sm text-white/70">
                        {currentDay.day.maxwind_kph} km/h max
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      {weather.current.wind_kph} km/h
                    </div>
                    <div className="text-sm text-white/70">
                      {weather.current.wind_dir}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌧️</span>
                    <div>
                      <div className="font-semibold">Precipitation</div>
                      <div className="text-sm text-white/70">
                        {currentDay.day.totalprecip_mm.toFixed(1)} mm total
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">
                      {currentDay.day.daily_chance_of_rain}%
                    </div>
                    <div className="text-sm text-white/70">chance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === "hourly" && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h4 className="text-xl font-bold mb-4 flex items-center">
              <span className="mr-2">⏰</span>
              Hourly Forecast - {formatDate(currentDay.date)}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
              {currentDay.hour.map((hour, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setSelectedHour(selectedHour === index ? null : index)
                  }
                  className={`p-4 rounded-xl transition-all duration-300 ${
                    selectedHour === index
                      ? "bg-gradient-to-b from-cyan-500/30 to-purple-500/30 border-2 border-cyan-400"
                      : "bg-white/10 hover:bg-white/20 border border-white/20"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-sm text-white/70 mb-2">
                      {formatTime(hour.time)}
                    </div>
                    <div className="text-2xl mb-2">
                      {getWeatherEmoji(hour.condition)}
                    </div>
                    <div className="font-bold">{Math.round(hour.temp_c)}°</div>
                    <div className="text-xs text-white/70">
                      Feels {Math.round(hour.feelslike_c)}°
                    </div>
                    <div className="text-xs text-white/50 mt-1">
                      {hour.chance_of_rain}% rain
                    </div>
                    {selectedHour === index && (
                      <div className="mt-2 pt-2 border-t border-white/20 text-xs space-y-1">
                        <div>
                          Wind: {hour.wind_kph} km/h {hour.wind_dir}
                        </div>
                        <div>Humidity: {hour.humidity}%</div>
                        <div>UV: {hour.uv}</div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {viewMode === "details" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Detailed Metrics */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🔍</span>
                Detailed Conditions
              </h4>
              <div className="space-y-4">
                {[
                  {
                    label: "Temperature",
                    value: `${weather.current.temp_c}°C / ${weather.current.temp_f}°F`,
                    icon: "🌡️",
                  },
                  {
                    label: "Feels Like",
                    value: `${weather.current.feelslike_c}°C`,
                    icon: "🤚",
                  },
                  {
                    label: "Humidity",
                    value: `${weather.current.humidity}%`,
                    icon: "💧",
                  },
                  {
                    label: "Wind",
                    value: `${weather.current.wind_kph} km/h ${weather.current.wind_dir}`,
                    icon: "💨",
                  },
                  {
                    label: "Pressure",
                    value: `${weather.current.pressure_mb} mb`,
                    icon: "📊",
                  },
                  {
                    label: "Visibility",
                    value: `${weather.current.vis_km} km`,
                    icon: "👁️",
                  },
                  {
                    label: "UV Index",
                    value: `${weather.current.uv} (${uvInfo.level})`,
                    icon: "☀️",
                  },
                  {
                    label: "Air Quality",
                    value: `${aqiInfo.level} (${weather.current.air_quality.us_epa_index})`,
                    icon: "🌬️",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/10 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <span className="font-bold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Air Quality Breakdown */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🌬️</span>
                Air Quality Details
              </h4>
              <div className="space-y-4">
                {[
                  {
                    label: "Carbon Monoxide",
                    value: `${weather.current.air_quality.co.toFixed(1)} μg/m³`,
                    level: "Good",
                  },
                  {
                    label: "Nitrogen Dioxide",
                    value: `${weather.current.air_quality.no2.toFixed(
                      1
                    )} μg/m³`,
                    level: "Good",
                  },
                  {
                    label: "Ozone",
                    value: `${weather.current.air_quality.o3.toFixed(1)} μg/m³`,
                    level: "Moderate",
                  },
                  {
                    label: "Sulfur Dioxide",
                    value: `${weather.current.air_quality.so2.toFixed(
                      1
                    )} μg/m³`,
                    level: "Good",
                  },
                  {
                    label: "PM2.5",
                    value: `${weather.current.air_quality.pm2_5.toFixed(
                      1
                    )} μg/m³`,
                    level: "Good",
                  },
                  {
                    label: "PM10",
                    value: `${weather.current.air_quality.pm10.toFixed(
                      1
                    )} μg/m³`,
                    level: "Good",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/10 rounded-xl"
                  >
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-white/70">{item.value}</div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        item.level === "Good"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {item.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {viewMode === "astronomy" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sun & Moon */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">☀️</span>
                Sun & Moon - {formatDate(currentDay.date)}
              </h4>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">☀️</span>
                    <span className="font-bold text-lg">Sun</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-white/70">Sunrise</div>
                      <div className="font-bold">
                        {currentDay.astro.sunrise}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-white/70">Sunset</div>
                      <div className="font-bold">{currentDay.astro.sunset}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">
                      {getMoonEmoji(currentDay.astro.moon_phase)}
                    </span>
                    <span className="font-bold text-lg">Moon</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-white/70">Moonrise</div>
                      <div className="font-bold">
                        {currentDay.astro.moonrise}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-white/70">Moonset</div>
                      <div className="font-bold">
                        {currentDay.astro.moonset}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-white/70">Phase</div>
                    <div className="font-bold">
                      {currentDay.astro.moon_phase}
                    </div>
                    <div className="text-sm text-white/70">
                      {currentDay.astro.moon_illumination}% illuminated
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Moon Phase Calendar */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">🌙</span>
                Moon Phases This Week
              </h4>
              <div className="space-y-3">
                {weather.forecast.forecastday.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/10 rounded-xl"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {getMoonEmoji(day.astro.moon_phase)}
                      </span>
                      <div>
                        <div className="font-medium">
                          {formatDate(day.date)}
                        </div>
                        <div className="text-sm text-white/70">
                          {day.astro.moon_phase}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        {day.astro.moon_illumination}%
                      </div>
                      <div className="text-xs text-white/70">illuminated</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 p-6 backdrop-blur-md bg-white/5 border-t border-white/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">🌦️</span>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Weather Forecast Pro
            </span>
          </div>
          <p className="text-white/70 text-sm">
            Professional weather insights • Comprehensive forecasting • Always
            accurate
          </p>
          <p className="text-white/50 text-xs mt-2">
            Advanced meteorological data for the modern generation
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.3); }
          50% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.6); }
        }
        
        @keyframes slide-in {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;