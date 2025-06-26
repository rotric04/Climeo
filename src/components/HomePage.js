import React from 'react';

function HomePage() {
  const [weather, setWeather] = React.useState(null);
  const [location, setLocation] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [searchInput, setSearchInput] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("current");

  // Auto-detect location on component mount
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lon: longitude });
          // Use reverse geocoding to get city name
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
            );
            const data = await response.json();
            const cityName = data.city || data.locality || "Current Location";
            setLocation(cityName);
            fetchWeather(cityName);
          } catch (err) {
            console.error("Error getting location name:", err);
            setLocation("Current Location");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocation("London"); // Default fallback
          fetchWeather("London");
        },
      );
    } else {
      setLocation("London"); // Default fallback
      fetchWeather("London");
    }
  }, []);

  const fetchWeather = async (city) => {
    if (!city) return;

    setLoading(true);
    setError(null);

    try {
      // 🔑 REPLACE WITH YOUR API KEY HERE
      const API_KEY = "7efd53991ebf4da99ee200513252506";
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`,
      );
      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }
      const data = await response.json();
      setWeather(data);
      setLocation(data.location.name);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Failed to fetch weather data. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeather(searchInput.trim());
      setSearchInput("");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white font-inter">
      {/* Header */}
      <header className="p-6 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🌤️</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              climeo
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
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
              className="text-white/70 hover:text-white transition-colors"
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
              placeholder="Search city..."
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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6 backdrop-blur-md">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {weather && !loading && (
          <div className="space-y-6">
            {/* Current Weather Hero */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 rounded-3xl p-8">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-5xl font-bold mb-2">
                    {Math.round(weather.current.temp_c)}°
                  </div>
                  <p className="text-white/70">Temperature</p>
                  <p className="text-sm text-white/50">
                    Feels like {Math.round(weather.current.feelslike_c)}°
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">💨</div>
                    <div className="text-lg font-semibold">
                      {weather.current.wind_kph} km/h
                    </div>
                    <div className="text-xs text-white/70">Wind</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">💧</div>
                    <div className="text-lg font-semibold">
                      {weather.current.humidity}%
                    </div>
                    <div className="text-xs text-white/70">Humidity</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">👁️</div>
                    <div className="text-lg font-semibold">
                      {weather.current.vis_km} km
                    </div>
                    <div className="text-xs text-white/70">Visibility</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-2xl mb-1">🌡️</div>
                    <div className="text-lg font-semibold">
                      {weather.current.pressure_mb} mb
                    </div>
                    <div className="text-xs text-white/70">Pressure</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-2 bg-white/10 backdrop-blur-md rounded-2xl p-2">
              {[
                { id: "current", label: "Current", icon: "🌤️" },
                { id: "details", label: "Details", icon: "📊" },
                { id: "map", label: "Map", icon: "🗺️" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="font-semibold">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "current" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "UV Index",
                    value: weather.current.uv,
                    icon: "☀️",
                    unit: "",
                  },
                  {
                    label: "Wind Direction",
                    value: weather.current.wind_dir,
                    icon: "🧭",
                    unit: "",
                  },
                  {
                    label: "Gust Speed",
                    value: weather.current.gust_kph,
                    icon: "💨",
                    unit: " km/h",
                  },
                  {
                    label: "Cloud Cover",
                    value: weather.current.cloud,
                    icon: "☁️",
                    unit: "%",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <div className="text-2xl font-bold mb-1">
                      {item.value}
                      {item.unit}
                    </div>
                    <div className="text-white/70 text-sm">{item.label}</div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "details" && (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="mr-3">📊</span>
                  Detailed Weather Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-white/70">Temperature (°C)</span>
                      <span className="font-semibold">
                        {weather.current.temp_c}°
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-white/70">Temperature (°F)</span>
                      <span className="font-semibold">
                        {weather.current.temp_f}°
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-white/70">Feels Like (°C)</span>
                      <span className="font-semibold">
                        {weather.current.feelslike_c}°
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-white/70">Feels Like (°F)</span>
                      <span className="font-semibold">
                        {weather.current.feelslike_f}°
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-white/70">Wind Speed (mph)</span>
                      <span className="font-semibold">
                        {weather.current.wind_mph} mph
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-white/70">Wind Degree</span>
                      <span className="font-semibold">
                        {weather.current.wind_degree}°
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-white/70">Pressure (in)</span>
                      <span className="font-semibold">
                        {weather.current.pressure_in} in
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-white/20">
                      <span className="text-white/70">Visibility (miles)</span>
                      <span className="font-semibold">
                        {weather.current.vis_miles} mi
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "map" && (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="mr-3">🗺️</span>
                  Location Map
                </h3>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-6xl mb-4">📍</div>
                  <div className="space-y-2">
                    <p className="text-xl font-semibold">
                      {weather.location.name}
                    </p>
                    <p className="text-white/70">
                      {weather.location.region}, {weather.location.country}
                    </p>
                    <p className="text-white/50">
                      Coordinates: {weather.location.lat},{" "}
                      {weather.location.lon}
                    </p>
                    <p className="text-white/50">
                      Timezone: {weather.location.tz_id}
                    </p>
                  </div>
                  <div className="mt-6">
                    <a
                      href={`https://www.google.com/maps?q=${weather.location.lat},${weather.location.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 font-semibold"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 p-6 backdrop-blur-md bg-white/5 border-t border-white/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl">🌤️</span>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              climeo
            </span>
          </div>
          <p className="text-white/70 text-sm">
            Your Gen Z weather companion • Real-time data • Always accurate
          </p>
          <p className="text-white/50 text-xs mt-2">
            Made with 💜 for the next generation
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.3); }
          50% { box-shadow: 0 0 30px rgba(34, 211, 238, 0.6); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default HomePage;