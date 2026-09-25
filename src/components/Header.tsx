import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Download, Moon, Sun, Info, Home, Code } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-all duration-300 shadow-sm dark:shadow-gray-800/20">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
              <Download className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="hidden xs:block">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white transition-colors duration-200">TeraBox Downloader</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">Professional File Downloader</p>
            </div>
          </Link>

          <nav className="flex items-center space-x-1 sm:space-x-2 md:space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                isActive('/') 
                  ? 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-600 dark:text-blue-400 shadow-md' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Home</span>
            </Link>
            
            <Link
              to="/download"
              className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                isActive('/download') 
                  ? 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-600 dark:text-blue-400 shadow-md' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Code className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">API</span>
            </Link>
            
            <Link
              to="/about"
              className={`flex items-center space-x-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                isActive('/about') 
                  ? 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-600 dark:text-blue-400 shadow-md' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Info className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">About</span>
            </Link>

            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-600 dark:text-gray-300 hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-md hover:shadow-lg group"
              aria-label="Toggle theme"
            >
              <div className="relative">
                {theme === 'light' ? (
                  <Moon className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:rotate-12" />
                ) : (
                  <Sun className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:rotate-45" />
                )}
              </div>
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;