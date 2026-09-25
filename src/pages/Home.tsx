import React, { useState } from 'react';
import { Download, Settings, AlertCircle, CheckCircle, Loader2, ExternalLink } from 'lucide-react';
import { useCookie } from '../context/CookieContext';
import CookieModal from '../components/CookieModal';
import DownloadCard from '../components/DownloadCard';
import { downloadFile } from '../services/api';

interface FileInfo {
  file_name: string;
  download_link: string;
  thumbnail: string;
  file_size: string;
  size_bytes: number;
  proxy_url: string;
}

const Home: React.FC = () => {
  const { cookie, hasCookie } = useCookie();
  const [showCookieModal, setShowCookieModal] = useState(false);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [error, setError] = useState('');

  const handleDownload = async () => {
    if (!url.trim()) {
      setError('Please enter a TeraBox URL');
      return;
    }

    if (!hasCookie()) {
      setShowCookieModal(true);
      return;
    }

    setLoading(true);
    setError('');
    setFileInfo(null);

    try {
      const result = await downloadFile(url, cookie.startsWith('ndus=') ? cookie : `ndus=${cookie}`);
      if (result.error) {
        setError(result.error);
      } else {
        setFileInfo(result);
      }
    } catch (err) {
      setError('Failed to process the download. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDownload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 transition-all duration-500">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        {/* Hero Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-tight">
              Download from{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
                  TeraBox
                </span>
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-pulse"></span>
              </span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Fast, secure, and reliable file downloads from TeraBox. Get direct download links with no limits.
            </p>
            
            {/* Floating animations */}
            <div className="absolute top-10 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
            <div className="absolute top-20 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-float-delayed opacity-40"></div>
            <div className="absolute top-32 left-1/3 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-float-slow opacity-50"></div>
          </div>
        </div>

        {/* Cookie Status */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="animate-fade-in bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-3">
                {hasCookie() ? (
                  <>
                    <div className="relative">
                      <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 text-green-500 animate-pulse" />
                      <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Cookie Configured</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Ready to download files</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <AlertCircle className="h-6 w-6 sm:h-7 sm:w-7 text-amber-500 animate-bounce" />
                      <div className="absolute inset-0 rounded-full bg-amber-500 opacity-20 animate-pulse"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">Cookie Required</p>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Configure your TeraBox cookie to start downloading</p>
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={() => setShowCookieModal(true)}
                className="relative overflow-hidden flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
              >
                <Settings className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-180 transition-transform duration-500" />
                <span className="whitespace-nowrap text-sm sm:text-base font-medium">{hasCookie() ? 'Update' : 'Setup'} Cookie</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="animate-fade-in-up bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700 mb-4 sm:mb-6 md:mb-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">
              Enter TeraBox URL
            </h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="relative group">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="https://terabox.com/s/... or https://1024terabox.com/s/..."
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 pl-12 sm:pl-14 pr-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl sm:rounded-2xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 group-hover:shadow-lg focus:shadow-xl text-sm sm:text-base"
                  disabled={loading}
                />
                <ExternalLink className="absolute left-4 sm:left-5 top-1/2 transform -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-hover:text-blue-500 transition-all duration-300 group-focus-within:scale-110" />
                
                {/* Input glow effect */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>

              <button
                onClick={handleDownload}
                disabled={loading || !url.trim()}
                className="relative overflow-hidden w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-semibold transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl disabled:scale-100 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center space-x-2 sm:space-x-3 group text-sm sm:text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5 sm:h-6 sm:w-6 group-hover:animate-bounce transition-transform duration-300" />
                    <span>Get Download Link</span>
                  </>
                )}
                
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </div>

            {error && (
              <div className="mt-4 sm:mt-6 p-4 sm:p-5 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl sm:rounded-2xl animate-shake shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 animate-pulse" />
                    <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 animate-ping"></div>
                  </div>
                  <p className="text-red-700 dark:text-red-400 text-sm sm:text-base font-medium">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* File Info Display */}
        {fileInfo && <DownloadCard fileInfo={fileInfo} />}

        {/* Cookie Modal */}
        {showCookieModal && (
          <CookieModal onClose={() => setShowCookieModal(false)} />
        )}
      </div>
    </div>
  );
};

export default Home;