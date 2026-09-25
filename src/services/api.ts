interface FileInfo {
  file_name: string;
  download_link: string;
  thumbnail: string;
  file_size: string;
  size_bytes: number;
  proxy_url: string;
  error?: string;
}

// Updated TeraBox API implementation using Netlify functions
export const downloadFile = async (link: string, cookie: string): Promise<FileInfo> => {
  try {
    if (!link) {
      return { error: "Invalid request parameters." } as FileInfo;
    }

    if (!cookie) {
      return { error: "Cookie parameter is required for authentication." } as FileInfo;
    }

    // Use download endpoint for API calls
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        link: link,
        cookies: cookie.startsWith('ndus=') ? cookie : `ndus=${cookie}`
      }),
    });

    const data = await response.json();

    if (data.error) {
      return { error: data.error } as FileInfo;
    }

    return data as FileInfo;
  } catch (error) {
    console.error('API call failed:', error);
    return { error: "A generic error occurred. Please try again." } as FileInfo;
  }
};

// New function for the dedicated download endpoint
export const downloadFileViaDownloadEndpoint = async (link: string, cookie: string): Promise<FileInfo> => {
  try {
    if (!link) {
      return { error: "Invalid request parameters." } as FileInfo;
    }

    if (!cookie) {
      return { error: "Cookie parameter is required for authentication." } as FileInfo;
    }

    // Use dedicated download endpoint
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        link: link,
        cookies: cookie.startsWith('ndus=') ? cookie : `ndus=${cookie}`
      }),
    });

    const data = await response.json();

    if (data.error) {
      return { error: data.error } as FileInfo;
    }

    return data as FileInfo;
  } catch (error) {
    console.error('Download API call failed:', error);
    return { error: "A generic error occurred. Please try again." } as FileInfo;
  }
};

// Export both functions for flexibility
export { downloadFile as getFileInfo };