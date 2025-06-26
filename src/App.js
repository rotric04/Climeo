import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Lazy load components for better performance
const HomePage = lazy(() => import('./components/HomePage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ForecastPage = lazy(() => import('./components/ForecastPage'));
const VibesPage = lazy(() => import('./components/VibesPage'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
      <p className="text-white/70 text-lg">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/forecast" element={<ForecastPage />} />
            <Route path="/vibes" element={<VibesPage />} />
            {/* Catch all route for 404 */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;