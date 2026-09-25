import React, { useState } from 'react';
import { Code, Copy, Check, ExternalLink, Play, FileText, Shield, Info, AlertTriangle, CheckCircle } from 'lucide-react';

const Download: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const baseUrl = window.location.origin;

  const postExample = `curl -X POST "${baseUrl}/api/download" \\
  -H "Content-Type: application/json" \\
  -d '{
    "link": "https://1024terabox.com/s/1abc123def456",
    "cookies": "ndus=YourCookieValueHere"
  }'`;

  const jsExample = `// JavaScript/Node.js Example
const response = await fetch('${baseUrl}/api/download', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    link: 'https://1024terabox.com/s/1abc123def456',
    cookies: 'ndus=YourCookieValueHere'
  })
});

const data = await response.json();
console.log(data);`;

  const pythonExample = `# Python Example
import requests

url = "${baseUrl}/api/download"
payload = {
    "link": "https://1024terabox.com/s/1abc123def456",
    "cookies": "ndus=YourCookieValueHere"
}

response = requests.post(url, json=payload)
data = response.json()
print(data)`;

  const responseExample = `{
  "file_name": "example_file.zip",
  "download_link": "https://direct-download-link.com/file",
  "thumbnail": "https://thumbnail-url.com/thumb.jpg",
  "file_size": "125.50 MB",
  "size_bytes": 131621888,
  "proxy_url": "https://terabox.ashlynn.workers.dev/proxy?url=encoded_url&file_name=example_file.zip&cookie=encoded_cookie"
}`;

  const errorExample = `{
  "error": "Authentication failed. Please check your cookies and try again."
}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="animate-fade-in-up">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">API Documentation</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Learn how to integrate TeraBox file downloading into your applications using our REST API
            </p>
            
            {/* API Status */}
            <div className="mt-4 sm:mt-6 inline-flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-3 sm:px-4 py-2 rounded-full font-medium text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>API Status: Active</span>
            </div>
          </div>
        </div>

        {/* Quick Start */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700 mb-6 sm:mb-8 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4 sm:mb-6">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Play className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">Quick Start</h2>
          </div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Base URL</h3>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                <code className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 break-all block overflow-x-auto">{baseUrl}</code>
              </div>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Authentication</h3>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                Requires TeraBox <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">ndus</code> cookie for authentication
              </p>
            </div>
          </div>
        </div>

        {/* Cookie Guide */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-orange-200 dark:border-orange-800 mb-6 sm:mb-8 shadow-xl">
          <div className="flex items-center space-x-3 mb-4 sm:mb-6">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">How to Export NDUS Cookie</h2>
          </div>
          
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">
            Follow these simple steps to extract your NDUS cookie using the Cookies Editor extension:
          </p>

          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-md">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-1 sm:mb-2">Install Cookies Editor Extension</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Download and install the Cookies Editor extension from your browser's extension store (Chrome Web Store, Firefox Add-ons, etc.)</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-md">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-1 sm:mb-2">Open TeraBox Website</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Navigate to <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs">https://terabox.com</code> in your browser and log in to your account</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-md">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-1 sm:mb-2">Play Any Video</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Find any video file on TeraBox and start playing it. This ensures your session is active and the NDUS cookie is properly set</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-md">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-1 sm:mb-2">Open Cookies Editor</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">Click on the Cookies Editor extension icon in your browser toolbar</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-md">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-red-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">5</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-1 sm:mb-2">Find NDUS Cookie</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">In the cookies list, search for the cookie named <code className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1 py-0.5 rounded text-xs">ndus</code></p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-md">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-amber-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">6</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-1 sm:mb-2">Copy Cookie Value</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2">Copy the entire value of the NDUS cookie. It should look like:</p>
                    <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs break-all">Y2YqaCTteHuiU3Ud_MYU7vHoVW4DNBi0MPmg_1tQ</code>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-5 shadow-md">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-teal-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">7</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-1 sm:mb-2">Use in API</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2">Use the complete cookie in the format:</p>
                    <code className="block bg-gray-100 dark:bg-gray-700 p-2 rounded text-xs break-all">ndus=YOUR_COPIED_VALUE</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Tips */}
          <div className="mt-6 sm:mt-8 bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 sm:p-5">
            <div className="flex items-center space-x-2 mb-3">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 text-sm sm:text-base">Important Tips</h4>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-blue-800 dark:text-blue-200">
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong>Alternative Method:</strong> You can also use browser Developer Tools (F12) → Application → Cookies → terabox.com → find 'ndus'</span>
              </li>
              <li className="flex items-start space-x-2">
                <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <span><strong>Cookie Validity:</strong> NDUS cookies may expire after some time. If you get authentication errors, generate a new cookie</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong>Account Type:</strong> Both free and premium accounts work, but premium accounts offer significantly faster download speeds</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Endpoints */}
        <div className="space-y-6 sm:space-y-8">
          {/* POST Method */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 sm:px-3 py-1 rounded-lg font-mono text-xs sm:text-sm">POST</span>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white break-all">/api/download</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Get file information</p>
            </div>
          
            <div className="mb-4 p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-blue-800 dark:text-blue-200 text-xs sm:text-sm">
                <strong>Note:</strong> Only POST method is supported for security and consistency. GET method has been deprecated.
              </p>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">Request Body</h4>
                <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-3 sm:p-4 relative overflow-hidden">
                  <button
                    onClick={() => copyToClipboard(postExample, 'post')}
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors duration-200 z-10"
                  >
                    {copiedCode === 'post' ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : <Copy className="h-3 w-3 sm:h-4 sm:w-4" />}
                  </button>
                  <div className="overflow-x-auto">
                    <pre className="text-xs sm:text-sm text-gray-100 whitespace-pre">
                      <code>{postExample}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">Parameters</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <code className="text-xs sm:text-sm font-mono text-blue-600 dark:text-blue-400">link</code>
                        <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">required</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">TeraBox share URL</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <code className="text-xs sm:text-sm font-mono text-blue-600 dark:text-blue-400">cookies</code>
                        <span className="text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded">required</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">TeraBox ndus cookie value</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">Headers</h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <code className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 break-all">Content-Type: application/json</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Code className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Code Examples</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">JavaScript/Node.js</h4>
                <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-3 sm:p-4 relative overflow-hidden">
                  <button
                    onClick={() => copyToClipboard(jsExample, 'js')}
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors duration-200 z-10"
                  >
                    {copiedCode === 'js' ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : <Copy className="h-3 w-3 sm:h-4 sm:w-4" />}
                  </button>
                  <div className="overflow-x-auto">
                    <pre className="text-xs sm:text-sm text-gray-100 whitespace-pre">
                      <code>{jsExample}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">Python</h4>
                <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-3 sm:p-4 relative overflow-hidden">
                  <button
                    onClick={() => copyToClipboard(pythonExample, 'python')}
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors duration-200 z-10"
                  >
                    {copiedCode === 'python' ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : <Copy className="h-3 w-3 sm:h-4 sm:w-4" />}
                  </button>
                  <div className="overflow-x-auto">
                    <pre className="text-xs sm:text-sm text-gray-100 whitespace-pre">
                      <code>{pythonExample}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Response Format */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Response Format</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">Success Response</h4>
                <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-3 sm:p-4 relative overflow-hidden">
                  <button
                    onClick={() => copyToClipboard(responseExample, 'response')}
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors duration-200 z-10"
                  >
                    {copiedCode === 'response' ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : <Copy className="h-3 w-3 sm:h-4 sm:w-4" />}
                  </button>
                  <div className="overflow-x-auto">
                    <pre className="text-xs sm:text-sm text-gray-100 whitespace-pre">
                      <code>{responseExample}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">Error Response</h4>
                <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-3 sm:p-4 relative overflow-hidden">
                  <button
                    onClick={() => copyToClipboard(errorExample, 'error')}
                    className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1.5 sm:p-2 text-gray-400 hover:text-white transition-colors duration-200 z-10"
                  >
                    {copiedCode === 'error' ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : <Copy className="h-3 w-3 sm:h-4 sm:w-4" />}
                  </button>
                  <div className="overflow-x-auto">
                    <pre className="text-xs sm:text-sm text-gray-100 whitespace-pre">
                      <code>{errorExample}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Response Fields */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Response Fields</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">file_name</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Original filename from TeraBox</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">download_link</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Direct download URL from TeraBox servers</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">thumbnail</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Preview image URL (if available)</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">file_size</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Human-readable file size (e.g., "125.50 MB")</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">size_bytes</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">File size in bytes (integer)</p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">proxy_url</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">External proxy download URL (https://terabox.ashlynn.workers.dev/proxy)</p>
              </div>
            </div>
          </div>
        </div>

          {/* Status Codes */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">HTTP Status Codes</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <span className="font-mono text-sm">200</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Success - File information retrieved</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="font-mono text-sm">400</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Bad Request - Invalid parameters</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="font-mono text-sm">404</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Not Found - Endpoint not found</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <span className="font-mono text-sm">500</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">Server Error - Internal error occurred</span>
              </div>
            </div>
          </div>
        </div>

          {/* API Testing */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-green-200 dark:border-green-800 shadow-xl">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Test the API</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base">
              Use these endpoints to test the API functionality:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Download Endpoint</h4>
                <code className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 break-all block overflow-x-auto">{baseUrl}/api/download</code>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">External Proxy</h4>
                <code className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 break-all block overflow-x-auto">https://terabox.ashlynn.workers.dev/proxy</code>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Try Web Interface</span>
              </a>
              <a
                href="https://github.com/terawebar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
              >
                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Documentation</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;