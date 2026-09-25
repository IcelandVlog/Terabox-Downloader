import React, { useState } from 'react';
import { X, Save, Info, Eye, EyeOff } from 'lucide-react';
import { useCookie } from '../context/CookieContext';

interface CookieModalProps {
  onClose: () => void;
}

const CookieModal: React.FC<CookieModalProps> = ({ onClose }) => {
  const { cookie, setCookie } = useCookie();
  const [inputCookie, setInputCookie] = useState(cookie);
  const [showCookie, setShowCookie] = useState(false);

  const handleSave = () => {
    setCookie(inputCookie);
    onClose();
  };

  const handleUseDefault = () => {
    const defaultCookie = "ndus=Y2YqaCTteHuiU3Ud_MYU7vHoVW4DNBi0MPmg_1tQ";
    setInputCookie(defaultCookie);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Configure TeraBox Cookie</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">How to get your TeraBox cookie:</h3>
                <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
                  <li>Open TeraBox in your browser and log in</li>
                  <li>Press F12 to open Developer Tools</li>
                  <li>Go to Application/Storage tab → Cookies → terabox.com</li>
                  <li>Find the "ndus" cookie and copy its value</li>
                  <li>Paste it below</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Cookie Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              TeraBox Cookie (ndus value)
            </label>
            <div className="relative">
              <input
                type={showCookie ? "text" : "password"}
                value={inputCookie}
                onChange={(e) => setInputCookie(e.target.value)}
                placeholder="Enter your ndus cookie value..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowCookie(!showCookie)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
              >
                {showCookie ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Default Cookie Option */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Or use default cookie</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              We provide a default cookie for testing purposes. Note that this may have limited functionality.
            </p>
            <button
              onClick={handleUseDefault}
              className="text-sm bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg transition-colors duration-200"
            >
              Use Default Cookie
            </button>
          </div>

          {/* Privacy Notice */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Privacy & Security</h3>
            <p className="text-sm text-green-800 dark:text-green-200">
              Your cookie is stored locally in your browser and is never sent to our servers. 
              It's only used to authenticate your requests directly to TeraBox.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!inputCookie.trim()}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            <span>Save Cookie</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieModal;
