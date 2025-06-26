"use client";
import React from "react";

function MainComponent() {
  const [currentVibe, setCurrentVibe] = React.useState(null);
  const [dailyChallenge, setDailyChallenge] = React.useState(null);
  const [motivationalQuote, setMotivationalQuote] = React.useState(null);
  const [quizStep, setQuizStep] = React.useState(0);
  const [quizAnswers, setQuizAnswers] = React.useState([]);
  const [weatherPersonality, setWeatherPersonality] = React.useState(null);
  const [currentFact, setCurrentFact] = React.useState(0);
  const [pollVotes, setPollVotes] = React.useState({});
  const [userVote, setUserVote] = React.useState(null);
  const [showShareModal, setShowShareModal] = React.useState(false);

  const vibes = [
    {
      emoji: "☀️",
      mood: "Sunny Bestie",
      description: "You're radiating main character energy today! ✨",
      color: "from-yellow-400 to-orange-500",
    },
    {
      emoji: "🌧️",
      mood: "Cozy Vibes",
      description: "Perfect day for self-care and hot cocoa moments 🫖",
      color: "from-blue-400 to-indigo-600",
    },
    {
      emoji: "⛈️",
      mood: "Dramatic Queen",
      description: "Channel that storm energy into something iconic! 💅",
      color: "from-purple-600 to-pink-600",
    },
    {
      emoji: "❄️",
      mood: "Winter Wonderland",
      description: "Serving ice princess realness today! 👑",
      color: "from-cyan-300 to-blue-500",
    },
    {
      emoji: "🌤️",
      mood: "Balanced Babe",
      description: "You're giving perfect harmony vibes rn ⚖️",
      color: "from-green-400 to-teal-500",
    },
    {
      emoji: "🌪️",
      mood: "Chaotic Good",
      description: "Embrace the beautiful mess that you are! 🌈",
      color: "from-red-400 to-yellow-500",
    },
  ];

  const challenges = [
    "Take a selfie with today's weather as your backdrop 📸",
    "Create a weather-inspired outfit and slay! 💃",
    "Write a haiku about how the weather makes you feel 📝",
    "Do a 5-minute dance to match the weather's energy 💃",
    "Text a friend a weather emoji that describes your mood 📱",
    "Make a weather-themed TikTok (even if it's just for you!) 🎵",
    "Practice gratitude for whatever weather you're experiencing 🙏",
    "Take 10 deep breaths of fresh air, no matter the weather 🌬️",
  ];

  const quotes = [
    "You're not just weathering the storm, you ARE the storm! ⛈️💪",
    "Sunshine mixed with a little hurricane - that's the vibe! 🌪️☀️",
    "Every season of your life serves a purpose, bestie 🌸❄️",
    "Rain or shine, you're absolutely divine! ✨🌧️",
    "Your energy changes the whole atmosphere - literally! 🌈⚡",
    "Be like the weather - unpredictable and absolutely iconic! 🌤️👑",
    "Storm clouds can't dim your inner sunshine! ☀️⛅",
    "You're the main character in every weather story! 🎬🌦️",
  ];

  const weatherFacts = [
    "Lightning strikes the Earth about 100 times per second! That's some serious energy ⚡",
    "A single cloud can weigh more than a million pounds - talk about heavy vibes! ☁️",
    "Raindrops aren't actually tear-shaped - they're more like tiny hamburgers! 🍔💧",
    "The fastest recorded wind speed was 301 mph - faster than most supercars! 🏎️💨",
    "Snow is actually colorless and translucent - it just looks white! ❄️✨",
    "The smell after rain has a name: petrichor - and it's literally iconic! 🌧️👃",
    "Hurricanes release the energy of 10 atomic bombs per second - nature is POWERFUL! 🌀💥",
    "The coldest temperature ever recorded was -128.6°F in Antarctica - brrr! 🥶❄️",
  ];

  const quizQuestions = [
    {
      question: "What's your ideal weather for a main character moment?",
      options: [
        "Sunny and bright ☀️",
        "Dramatic thunderstorm ⛈️",
        "Cozy rain 🌧️",
        "Snowy wonderland ❄️",
      ],
    },
    {
      question: "How do you handle unexpected weather changes?",
      options: [
        "Adapt and slay 💅",
        "Get a little dramatic 🎭",
        "Go with the flow 🌊",
        "Plan for everything 📋",
      ],
    },
    {
      question: "What weather matches your energy?",
      options: [
        "Constant sunshine ☀️",
        "Unpredictable storms ⛈️",
        "Gentle breeze 🍃",
        "Crisp winter air ❄️",
      ],
    },
  ];

  const personalities = {
    sunny: {
      type: "Solar Bestie",
      description:
        "You're pure sunshine energy! Always lifting others up and radiating positivity. Your vibe is infectious and you make every day brighter! ☀️✨",
      color: "from-yellow-400 to-orange-500",
    },
    stormy: {
      type: "Thunder Queen",
      description:
        "You're powerful, dramatic, and absolutely unforgettable! You bring intensity and passion to everything you do. When you enter a room, everyone notices! ⛈️👑",
      color: "from-purple-600 to-pink-600",
    },
    rainy: {
      type: "Cozy Curator",
      description:
        "You're all about those soft, aesthetic moments. You find beauty in the quiet times and create the most peaceful vibes wherever you go! 🌧️🫖",
      color: "from-blue-400 to-indigo-600",
    },
    snowy: {
      type: "Ice Princess",
      description:
        "You're cool, collected, and absolutely stunning. You have this ethereal quality that makes you stand out from the crowd. Pure winter royalty! ❄️👸",
      color: "from-cyan-300 to-blue-500",
    },
  };

  const pollQuestion = "What's your ultimate weather mood?";
  const pollOptions = [
    { id: "beach", text: "Beach day vibes 🏖️", votes: 45 },
    { id: "cozy", text: "Cozy indoor energy 🏠", votes: 32 },
    { id: "adventure", text: "Storm chasing thrills ⛈️", votes: 28 },
    { id: "aesthetic", text: "Autumn photo ops 🍂", votes: 51 },
  ];

  React.useEffect(() => {
    const randomVibe = vibes[Math.floor(Math.random() * vibes.length)];
    const randomChallenge =
      challenges[Math.floor(Math.random() * challenges.length)];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    setCurrentVibe(randomVibe);
    setDailyChallenge(randomChallenge);
    setMotivationalQuote(randomQuote);

    const savedVotes = {};
    pollOptions.forEach((option) => {
      savedVotes[option.id] = option.votes;
    });
    setPollVotes(savedVotes);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setMotivationalQuote(randomQuote);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handleQuizAnswer = (answerIndex) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);

    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      const personalityMap = ["sunny", "stormy", "rainy", "snowy"];
      const avgAnswer = Math.round(
        newAnswers.reduce((a, b) => a + b, 0) / newAnswers.length
      );
      setWeatherPersonality(
        personalities[personalityMap[avgAnswer]] || personalities.sunny
      );
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setWeatherPersonality(null);
  };

  const nextFact = () => {
    setCurrentFact((currentFact + 1) % weatherFacts.length);
  };

  const handlePollVote = (optionId) => {
    if (userVote) return;

    setUserVote(optionId);
    setPollVotes((prev) => ({
      ...prev,
      [optionId]: prev[optionId] + 1,
    }));
  };

  const shareContent = (platform) => {
    const text = `Just discovered my weather personality: ${
      weatherPersonality?.type || "Weather Bestie"
    }! Check out this vibe at Weather Vibes Hub! 🌤️✨`;
    const url = window.location.href;

    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          text
        )}&url=${encodeURIComponent(url)}`;
        break;
      case "instagram":
        navigator.clipboard.writeText(`${text} ${url}`);
        alert(
          "Content copied to clipboard! Paste it in your Instagram story 📱"
        );
        return;
      case "tiktok":
        navigator.clipboard.writeText(`${text} ${url}`);
        alert("Content copied to clipboard! Use it for your TikTok caption 🎵");
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
    setShowShareModal(false);
  };

  const totalVotes = Object.values(pollVotes).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 text-white font-inter overflow-hidden">
      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-4xl animate-float">🌈</div>
        <div className="absolute top-40 right-20 text-3xl animate-bounce">
          ⭐
        </div>
        <div className="absolute bottom-40 left-20 text-5xl animate-pulse">
          ✨
        </div>
        <div className="absolute bottom-20 right-10 text-4xl animate-float">
          🦋
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-4xl animate-bounce">🌤️</div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Weather Vibes Hub
              </h1>
              <p className="text-white/70 text-sm">
                where weather meets your energy ✨
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
              className="text-cyan-400 font-semibold hover:text-cyan-300 transition-colors"
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

          <button
            onClick={() => setShowShareModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-300 font-semibold flex items-center space-x-2"
          >
            <span>Share Vibes</span>
            <span>📱</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto p-6 space-y-8">
        {/* Daily Vibe Card */}
        {currentVibe && (
          <div
            className={`bg-gradient-to-r ${currentVibe.color} rounded-3xl p-8 text-center transform hover:scale-105 transition-all duration-300 animate-pulse-glow`}
          >
            <div className="text-6xl mb-4 animate-bounce">
              {currentVibe.emoji}
            </div>
            <h2 className="text-3xl font-bold mb-2">
              Today's Vibe: {currentVibe.mood}
            </h2>
            <p className="text-xl text-white/90">{currentVibe.description}</p>
            <button
              onClick={() => {
                const randomVibe =
                  vibes[Math.floor(Math.random() * vibes.length)];
                setCurrentVibe(randomVibe);
              }}
              className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all duration-300"
            >
              Get New Vibe ✨
            </button>
          </div>
        )}

        {/* Rotating Quote */}
        {motivationalQuote && (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
            <div className="text-2xl mb-2">💭</div>
            <p className="text-xl font-semibold italic animate-fade-in">
              {motivationalQuote}
            </p>
          </div>
        )}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Weather Personality Quiz */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="mr-3">🧠</span>
              Weather Personality Quiz
            </h3>

            {!weatherPersonality ? (
              <div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-white/70 mb-2">
                    <span>
                      Question {quizStep + 1} of {quizQuestions.length}
                    </span>
                    <span>
                      {Math.round((quizStep / quizQuestions.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-pink-400 to-purple-400 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(quizStep / quizQuestions.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-4">
                    {quizQuestions[quizStep].question}
                  </h4>
                  <div className="space-y-3">
                    {quizQuestions[quizStep].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuizAnswer(index)}
                        className="w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl text-left transition-all duration-300 hover:transform hover:scale-105"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={`bg-gradient-to-r ${weatherPersonality.color} rounded-xl p-6 text-center`}
              >
                <div className="text-4xl mb-3">🎉</div>
                <h4 className="text-2xl font-bold mb-2">
                  You're a {weatherPersonality.type}!
                </h4>
                <p className="text-white/90 mb-4">
                  {weatherPersonality.description}
                </p>
                <button
                  onClick={resetQuiz}
                  className="px-4 py-2 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  Take Again 🔄
                </button>
              </div>
            )}
          </div>

          {/* Daily Challenge */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <span className="mr-3">🎯</span>
              Daily Challenge
            </h3>
            <div className="text-center">
              <div className="text-4xl mb-4">🌟</div>
              <p className="text-lg mb-6">{dailyChallenge}</p>
              <button
                onClick={() => {
                  const randomChallenge =
                    challenges[Math.floor(Math.random() * challenges.length)];
                  setDailyChallenge(randomChallenge);
                }}
                className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full hover:from-green-500 hover:to-blue-600 transition-all duration-300 font-semibold"
              >
                New Challenge 🎲
              </button>
            </div>
          </div>
        </div>

        {/* Weather Facts */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">🤓</span>
            Random Weather Facts
          </h3>
          <div className="text-center">
            <div className="text-3xl mb-4">💡</div>
            <p className="text-lg mb-6">{weatherFacts[currentFact]}</p>
            <button
              onClick={nextFact}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 font-semibold"
            >
              Mind = Blown 🤯
            </button>
          </div>
        </div>

        {/* Interactive Poll */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <h3 className="text-2xl font-bold mb-4 flex items-center">
            <span className="mr-3">📊</span>
            Community Poll
          </h3>
          <h4 className="text-lg font-semibold mb-4">{pollQuestion}</h4>
          <div className="space-y-3">
            {pollOptions.map((option) => {
              const percentage =
                totalVotes > 0
                  ? Math.round((pollVotes[option.id] / totalVotes) * 100)
                  : 0;
              const isVoted = userVote === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handlePollVote(option.id)}
                  disabled={userVote !== null}
                  className={`w-full p-4 rounded-xl transition-all duration-300 relative overflow-hidden ${
                    isVoted
                      ? "bg-gradient-to-r from-pink-500 to-purple-500"
                      : userVote
                      ? "bg-white/10 cursor-not-allowed"
                      : "bg-white/10 hover:bg-white/20 hover:transform hover:scale-105"
                  }`}
                >
                  <div className="flex justify-between items-center relative z-10">
                    <span>{option.text}</span>
                    <span className="font-bold">
                      {userVote ? `${percentage}%` : pollVotes[option.id]}
                    </span>
                  </div>
                  {userVote && (
                    <div
                      className="absolute left-0 top-0 h-full bg-white/20 transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  )}
                </button>
              );
            })}
          </div>
          {userVote && (
            <p className="text-center text-white/70 mt-4">
              Thanks for voting! {totalVotes} total votes 🗳️
            </p>
          )}
        </div>

        {/* Weather Slogans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              slogan: "Slay the day, rain or shine! 💅☀️",
              color: "from-yellow-400 to-pink-400",
            },
            {
              slogan: "Storm energy = main character energy ⛈️👑",
              color: "from-purple-500 to-indigo-500",
            },
            {
              slogan: "Cloudy with a chance of iconic ☁️✨",
              color: "from-blue-400 to-purple-400",
            },
            {
              slogan: "Snow joke, you're amazing! ❄️😂",
              color: "from-cyan-400 to-blue-500",
            },
            {
              slogan: "Forecast: 100% chance of serving looks 📸",
              color: "from-pink-400 to-red-400",
            },
            {
              slogan: "Weather the storm, bestie! 🌪️💪",
              color: "from-green-400 to-teal-500",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${item.color} rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300`}
            >
              <p className="font-bold text-lg">{item.slogan}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Share Your Vibes! 📱
            </h3>
            <div className="space-y-3">
              <button
                onClick={() => shareContent("twitter")}
                className="w-full p-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Share on Twitter</span>
                <span>🐦</span>
              </button>
              <button
                onClick={() => shareContent("instagram")}
                className="w-full p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Share on Instagram</span>
                <span>📷</span>
              </button>
              <button
                onClick={() => shareContent("tiktok")}
                className="w-full p-3 bg-black hover:bg-gray-800 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Share on TikTok</span>
                <span>🎵</span>
              </button>
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-4 p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 mt-20 p-6 backdrop-blur-md bg-white/5 border-t border-white/20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-3xl animate-bounce">🌤️</span>
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Weather Vibes Hub
            </span>
          </div>
          <p className="text-white/70 text-sm">
            Where weather meets your energy • Stay iconic, bestie! ✨
          </p>
          <p className="text-white/50 text-xs mt-2">
            Made with 💜 for the vibes
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.2); }
          50% { box-shadow: 0 0 50px rgba(255, 255, 255, 0.4); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;