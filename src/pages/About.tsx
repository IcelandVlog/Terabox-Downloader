import React from 'react';
import { Download, Shield, Zap, Globe, ExternalLink, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          About <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">TeraBox Downloader</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 px-4">
          A professional, secure, and efficient way to download files from TeraBox
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Fast Downloads</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Get direct download links instantly without waiting or speed limits. Our optimized servers ensure maximum download speeds.
          </p>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Secure & Private</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Your cookies and data are stored locally in your browser. We don't store any personal information on our servers.
          </p>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Download className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No Limits</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Download files of any size without restrictions. Support for resumable downloads and range requests.
          </p>
        </div>

        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Globe className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Cross-Platform</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Works on all devices and browsers. Responsive design ensures optimal experience on desktop, tablet, and mobile.
          </p>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">How It Works</h2>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              1
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Get Your Cookie</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Log into your TeraBox account and copy the 'ndus' cookie from your browser's developer tools.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Configure Cookie</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enter your cookie in our secure form. It's stored locally in your browser and never sent to our servers.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Paste TeraBox URL</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Copy any TeraBox share link and paste it into our download form.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              4
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Download</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get instant access to direct download links with file previews and detailed information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Credits */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Heart className="h-6 w-6 text-red-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Made with Love</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          This project is developed and maintained by the Ashlynn Repository.
        </p>
        <a
          href="https://t.me/Ashlynn_Repository"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
        >
          <ExternalLink className="h-5 w-5" />
          <span>Visit Ashlynn Repository</span>
        </a>
      </div>
    </div>
  );
};

export default About;
