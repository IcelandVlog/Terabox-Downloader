import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Download from './pages/Download';
import { ThemeProvider } from './context/ThemeContext';
import { CookieProvider } from './context/CookieContext';

function App() {
  return (
    <ThemeProvider>
      <CookieProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-300">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/download" element={<Download />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CookieProvider>
    </ThemeProvider>
  );
}

export default App;