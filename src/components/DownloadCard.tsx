import React, { useState } from 'react';
import { Download, FileText, Image as ImageIcon, Video, Music, Archive, Copy, Check, ExternalLink } from 'lucide-react';

interface FileInfo {
  file_name: string;
  download_link: string;
  thumbnail: string;
  file_size: string;
  size_bytes: number;
  proxy_url: string;
}

interface DownloadCardProps {
  fileInfo: FileInfo;
}

const DownloadCard: React.FC<DownloadCardProps> = ({ fileInfo }) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension || '')) {
      return <ImageIcon className="h-8 w-8 text-blue-500" />;
    }
    if (['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'].includes(extension || '')) {
      return <Video className="h-8 w-8 text-red-500" />;
    }
    if (['mp3', 'wav', 'flac', 'aac', 'm4a', 'ogg'].includes(extension || '')) {
      return <Music className="h-8 w-8 text-green-500" />;
    }
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension || '')) {
      return <Archive className="h-8 w-8 text-orange-500" />;
    }
    return <FileText className="h-8 w-8 text-gray-500" />;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDirectDownload = () => {
    window.open(fileInfo.proxy_url, '_blank');
  };

  return (
    <div className="animate-fade-in-up bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Thumbnail */}
        <div className="flex-shrink-0 mx-auto lg:mx-0">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center overflow-hidden group hover:scale-105 transition-transform duration-300 shadow-md">
            {fileInfo.thumbnail && !imageError ? (
              <img
                src={fileInfo.thumbnail}
                alt={fileInfo.file_name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="group-hover:scale-110 transition-transform duration-300">
                {getFileIcon(fileInfo.file_name)}
              </div>
            )}
          </div>
        </div>

        {/* File Info */}
        <div className="flex-1 space-y-4">
          <div className="text-center lg:text-left">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 break-all line-clamp-2">
              {fileInfo.file_name}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 text-sm text-gray-600 dark:text-gray-400 justify-center lg:justify-start">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-lg font-medium inline-block w-fit mx-auto sm:mx-0">
                {fileInfo.file_size}
              </span>
              <span className="text-xs sm:text-sm">{fileInfo.size_bytes.toLocaleString()} bytes</span>
            </div>
          </div>

          {/* Download Options */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => window.open(fileInfo.download_link, '_blank')}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex-1 group"
              >
                <Download className="h-5 w-5 group-hover:animate-bounce" />
                <span>Download</span>
              </button>
              
              <button
                onClick={handleDirectDownload}
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg flex-1 group"
              >
                <ExternalLink className="h-5 w-5 group-hover:rotate-12" />
                <span>Proxy Download</span>
              </button>
            </div>

            {/* Copy Links */}
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Proxy URL</span>
                  <button
                    onClick={() => copyToClipboard(fileInfo.proxy_url)}
                    className="flex items-center space-x-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-200 transform hover:scale-105"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 break-all block">
                  {fileInfo.proxy_url}
                </span>
              </div>
              
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Direct URL</span>
                  <button
                    onClick={() => copyToClipboard(fileInfo.download_link)}
                    className="flex items-center space-x-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-200 transform hover:scale-105"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 break-all block">
                  {fileInfo.download_link}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadCard;