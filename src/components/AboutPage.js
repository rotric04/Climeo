"use client";
import React from "react";

function MainComponent() {
  const [activeSection, setActiveSection] = React.useState("overview");
  const [isVisible, setIsVisible] = React.useState({});

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const techStack = [
    { name: "React", icon: "⚛️", category: "Frontend" },
    { name: "JavaScript", icon: "🟨", category: "Language" },
    { name: "Tailwind CSS", icon: "🎨", category: "Styling" },
    { name: "Weather API", icon: "🌤️", category: "Integration" },
    { name: "Geolocation API", icon: "📍", category: "Browser API" },
    { name: "Responsive Design", icon: "📱", category: "UI/UX" },
  ];

  const features = [
    {
      title: "Real-time Weather Data",
      description: "Live weather updates with accurate forecasting",
      icon: "🌡️",
      highlight: true,
    },
    {
      title: "Auto Location Detection",
      description: "Automatically detects user location for instant weather",
      icon: "📍",
      highlight: false,
    },
    {
      title: "Interactive UI",
      description: "Modern, responsive interface with smooth animations",
      icon: "✨",
      highlight: true,
    },
    {
      title: "Multi-tab Navigation",
      description: "Organized weather information across different views",
      icon: "📊",
      highlight: false,
    },
    {
      title: "City Search",
      description: "Search weather for any city worldwide",
      icon: "🔍",
      highlight: true,
    },
    {
      title: "Mobile Optimized",
      description: "Perfect experience on mobile and desktop devices",
      icon: "📱",
      highlight: false,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Frontend Developer",
      avatar: "👩‍💻",
      text: "Climeo's interface is incredibly intuitive. The Gen Z aesthetic combined with professional functionality is impressive.",
      rating: 5,
    },
    {
      name: "Alex Rodriguez",
      role: "UX Designer",
      avatar: "👨‍🎨",
      text: "The attention to detail in the animations and responsive design shows real craftsmanship. Great portfolio piece!",
      rating: 5,
    },
    {
      name: "Maya Patel",
      role: "Product Manager",
      avatar: "👩‍💼",
      text: "Clean, modern, and functional. This demonstrates excellent understanding of user experience principles.",
      rating: 5,
    },
  ];

  const stats = [
    { label: "Lines of Code", value: "1,200+", icon: "💻" },
    { label: "Components Built", value: "15+", icon: "🧩" },
    { label: "API Integrations", value: "3", icon: "🔗" },
    { label: "Responsive Breakpoints", value: "5", icon: "📱" },
  ];

  const socialLinks = [
    {
      platform: "GitHub",
      url: "https://github.com/rotric04",
      icon: "🐙",
      color: "from-gray-600 to-gray-800",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/mohit-assudani-",
      icon: "💼",
      color: "from-blue-600 to-blue-800",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/mohitassudani",
      icon: "🐦",
      color: "from-sky-500 to-sky-700",
    },
    {
      platform: "Instagram",
      url: "https://instagram.com/mohit._.assudani",
      icon: "📸",
      color: "from-pink-500 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white font-inter">
      <header className="p-6 backdrop-blur-md bg-white/10 border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl animate-float">🌤️</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                climeo
              </h1>
              <p className="text-xs text-white/60">About Project</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-6">
            {[
              { id: "overview", label: "Overview" },
              { id: "features", label: "Features" },
              { id: "tech", label: "Tech Stack" },
              { id: "creator", label: "Creator" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <a
            href="/"
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 font-semibold"
          >
            Back to App
          </a>
        </div>
      </header>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8 animate-float">
            <div className="text-8xl mb-4">🌤️</div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Climeo
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              A modern weather application that combines Gen Z aesthetics with
              professional functionality. Built as a portfolio project to
              showcase frontend development skills and creative design thinking.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 animate-pulse-glow"
                data-animate
                id={`stat-${index}`}
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="overview" className="py-16 px-6" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Project Overview
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Climeo represents the perfect blend of modern web development and
              user-centric design
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="mr-3">🎯</span>
                  Project Goals
                </h3>
                <ul className="space-y-3 text-white/80">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3">•</span>
                    Create an intuitive weather application with modern UI/UX
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-3">•</span>
                    Demonstrate proficiency in React and modern JavaScript
                  </li>
                  <li className="flex items-start">
                    <span className="text-pink-400 mr-3">•</span>
                    Showcase responsive design and animation skills
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3">•</span>
                    Integrate third-party APIs effectively
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <span className="mr-3">🚀</span>
                  Development Journey
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    <div>
                      <p className="font-semibold">Planning & Design</p>
                      <p className="text-white/70 text-sm">
                        UI/UX wireframes and component architecture
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                    <div>
                      <p className="font-semibold">Core Development</p>
                      <p className="text-white/70 text-sm">
                        React components and API integration
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                    <div>
                      <p className="font-semibold">Polish & Optimization</p>
                      <p className="text-white/70 text-sm">
                        Animations, responsive design, and performance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 rounded-3xl p-8">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">💡</div>
                <h3 className="text-2xl font-bold mb-4">Key Highlights</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">🎨</span>
                    <span className="font-semibold">Modern Design</span>
                  </div>
                  <p className="text-white/70 text-sm">
                    Gradient backgrounds, glassmorphism effects, and smooth
                    animations
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">⚡</span>
                    <span className="font-semibold">Performance</span>
                  </div>
                  <p className="text-white/70 text-sm">
                    Optimized loading states and efficient API calls
                  </p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">📱</span>
                    <span className="font-semibold">Responsive</span>
                  </div>
                  <p className="text-white/70 text-sm">
                    Perfect experience across all device sizes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 px-6 bg-white/5" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Key Features
            </h2>
            <p className="text-white/70 text-lg">
              Comprehensive weather experience with modern functionality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 ${
                  feature.highlight ? "ring-2 ring-cyan-400/50" : ""
                }`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/70">{feature.description}</p>
                {feature.highlight && (
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-xs font-semibold">
                      Featured
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tech" className="py-16 px-6" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Technology Stack
            </h2>
            <p className="text-white/70 text-lg">
              Modern tools and technologies powering Climeo
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{tech.icon}</div>
                <h3 className="font-bold mb-1">{tech.name}</h3>
                <p className="text-white/60 text-xs">{tech.category}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">
              Development Approach
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🏗️</div>
                <h4 className="font-bold mb-2">Component-Based</h4>
                <p className="text-white/70 text-sm">
                  Modular React components for maintainability and reusability
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="font-bold mb-2">Mobile-First</h4>
                <p className="text-white/70 text-sm">
                  Responsive design approach ensuring great mobile experience
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="font-bold mb-2">Performance</h4>
                <p className="text-white/70 text-sm">
                  Optimized for fast loading and smooth user interactions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="creator" className="py-16 px-6" data-animate>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Meet the Creator
            </h2>
            <p className="text-white/70 text-lg">
              Passionate developer crafting digital experiences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="mb-8">
                <div className="text-8xl mb-4">👨‍💻</div>
                <h3 className="text-3xl font-bold mb-2">Mohit Assudani</h3>
                <p className="text-xl text-cyan-400 mb-4">
                  AI/ML Learner and Vibe Coder
                </p>
                <p className="text-white/80 leading-relaxed">
                  Passionate about creating beautiful, functional web
                  applications that solve real-world problems. Specializing in
                  React, modern JavaScript, and user-centered design principles.
                </p>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${social.color} rounded-full hover:scale-105 transition-all duration-300 font-semibold`}
                  >
                    <span>{social.icon}</span>
                    <span>{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-3">🎓</span>
                  Skills & Expertise
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "React & JavaScript",
                    "UI/UX Design",
                    "Responsive Design",
                    "API Integration",
                    "Modern CSS",
                    "Performance Optimization",
                  ].map((skill, index) => (
                    <div
                      key={index}
                      className="bg-white/10 rounded-lg p-3 text-center text-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-4 flex items-center">
                  <span className="mr-3">💼</span>
                  Let's Connect
                </h4>
                <p className="text-white/80 mb-4">
                  Interested in collaborating or discussing opportunities? I'd
                  love to hear from you!
                </p>
                <div className="space-y-3">
                  <a
                    href="mailto:mohit@example.com"
                    className="flex items-center space-x-3 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>📧</span>
                    <span>mohit@example.com</span>
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="flex items-center space-x-3 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <span>📱</span>
                    <span>+1 (234) 567-8900</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-16 px-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
        data-animate
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">🚀</div>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Ready to Collaborate?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Whether you're looking for a developer, have a project idea, or just
            want to connect, I'm always excited to discuss new opportunities and
            creative challenges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:mohit@example.com"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 font-semibold text-lg"
            >
              Get In Touch
            </a>
            <a
              href="/"
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-300 font-semibold text-lg"
            >
              Try Climeo
            </a>
          </div>
        </div>
      </section>

      <footer className="p-6 backdrop-blur-md bg-white/5 border-t border-white/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <span className="text-2xl">🌤️</span>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  climeo
                </span>
                <p className="text-white/60 text-sm">
                  Portfolio Project by Mohit Assudani
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="/"
                className="text-white/70 hover:text-white transition-colors"
              >
                Weather App
              </a>
              <a href="/about" className="text-cyan-400 font-semibold">
                About
              </a>
              <a
                href="https://github.com/rotric04"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/20 text-center">
            <p className="text-white/50 text-sm">
              Made with 💜 by Mohit Assudani • Showcasing modern web development
              skills
            </p>
          </div>
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
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        [data-animate] {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;