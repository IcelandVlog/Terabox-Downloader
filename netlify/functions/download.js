const DEFAULT_COOKIE = "ndus=Y2YqaCTteHuiU3Ud_MYU7vHoVW4DNBi0MPmg_1tQ" // Fallback cookie

function getHeaders(cookie) {
  return {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br", 
    "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
    "Connection": "keep-alive",
    "DNT": "1",
    "Host": "www.1024terabox.com",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0",
    "sec-ch-ua": '"Microsoft Edge";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Cookie": cookie || DEFAULT_COOKIE,
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
  };
}

function getSize(sizeBytes) {
  if (sizeBytes >= 1024 * 1024 * 1024) {
    return `${(sizeBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  } else if (sizeBytes >= 1024 * 1024) {
    return `${(sizeBytes / (1024 * 1024)).toFixed(2)} MB`;
  } else if (sizeBytes >= 1024) {
    return `${(sizeBytes / 1024).toFixed(2)} KB`;
  }
  return `${sizeBytes} bytes`;
}

function findBetween(str, start, end) {
  const startIndex = str.indexOf(start) + start.length;
  const endIndex = str.indexOf(end, startIndex);
  if (startIndex === -1 || endIndex === -1) return "";
  return str.slice(startIndex, endIndex);
}

async function getFileInfo(link, event, cookie) {
  try {
    if (!link) {
      return { error: "Invalid request parameters." };
    }

    const headers = getHeaders(cookie);
    let response = await fetch(link, { headers });
    if (!response.ok) {
      console.error(`Failed to fetch initial link: ${response.status}`);
      return { error: "Unable to process the request. Please check your cookies and try again." };
    }

    const finalUrl = response.url;
    const url = new URL(finalUrl);
    const surl = url.searchParams.get("surl");
    if (!surl) {
      console.error("No surl found in URL");
      return { error: "Invalid link format. Please provide a valid TeraBox link." };
    }

    response = await fetch(finalUrl, { headers });
    const text = await response.text();

    const jsToken = findBetween(text, 'fn%28%22', '%22%29');
    const logid = findBetween(text, 'dp-logid=', '&');
    const bdstoken = findBetween(text, 'bdstoken":"', '"');

    if (!jsToken || !logid || !bdstoken) {
      console.error("Failed to extract tokens:", { jsToken: !!jsToken, logid: !!logid, bdstoken: !!bdstoken });
      return { error: "Authentication failed. Please check your cookies and try again." };
    }

    const params = new URLSearchParams({
      app_id: "250528",
      web: "1",
      channel: "dubox",
      clienttype: "0",
      jsToken: jsToken,
      "dp-logid": logid,
      page: "1",
      num: "20",
      by: "name",
      order: "asc",
      site_referer: finalUrl,
      shorturl: surl,
      root: "1,",
    });

    response = await fetch(`https://www.1024terabox.com/share/list?${params}`, { headers });
    const data = await response.json();

    if (!data || !data.list || !data.list.length || data.errno) {
      console.error("API error:", data.errno, data.errmsg);
      return { error: "Unable to retrieve file information. Please verify your cookies are valid." };
    }

    const fileInfo = data.list[0];
    const baseUrl = `https://${event.headers.host}`;
    
    return {
      file_name: fileInfo.server_filename || "",
      download_link: fileInfo.dlink || "",
      thumbnail: fileInfo.thumbs?.url3 || "",
      file_size: getSize(parseInt(fileInfo.size || 0)),
      size_bytes: parseInt(fileInfo.size || 0),
      proxy_url: `https://terabox.ashlynn.workers.dev/proxy?url=${encodeURIComponent(fileInfo.dlink)}&file_name=${encodeURIComponent(fileInfo.server_filename || 'download')}&cookie=${encodeURIComponent(cookie)}`,
    };
  } catch (error) {
    console.error("Error in getFileInfo:", error.message);
    return { error: "A generic error occurred. Please try again." };
  }
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Expose-Headers": "Content-Length"
};

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: ''
    };
  }

  // Only handle POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      body: JSON.stringify({ error: "Method not allowed. Use POST request." })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { link, cookies } = body;
    
    if (!link) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
        body: JSON.stringify({ error: "Missing required parameter: link" })
      };
    }

    if (!cookies) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json", ...CORS_HEADERS },
        body: JSON.stringify({ error: "Missing required parameter: cookies" })
      };
    }

    const fileInfo = await getFileInfo(link, event, cookies);
    return {
      statusCode: fileInfo.error ? 400 : 200,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      body: JSON.stringify(fileInfo)
    };
  } catch (error) {
    console.error("Download API error:", error.message);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
      body: JSON.stringify({ error: "Internal server error. Please try again." })
    };
  }
};
