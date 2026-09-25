const DEFAULT_COOKIE = "ndus=YeF0xvEteHuibCedALNYs70N6S9NkRFgaxOxkqSH"; // Fallback cookie

function getHeaders(cookie, host) {
  return {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9,hi;q=0.8",
    "Connection": "keep-alive",
    "DNT": "1",
    "Host": host || "www.1024terabox.com",
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

async function getFileInfo(link, cookie) {
  try {
    if (!link) {
      return { error: "Invalid request parameters." };
    }

    const initialHost = new URL(link).host;
    let response = await fetch(link, { headers: getHeaders(cookie, initialHost) });
    if (!response.ok) {
      console.error(`Failed to fetch initial link: ${response.status}`);
      return {
        error: "Unable to process the request. Please check your cookies and try again.",
        debug: { step: "initial_fetch", status: response.status },
      };
    }

    const finalUrl = response.url;
    const url = new URL(finalUrl);
    const finalHost = url.host;
    const surl = url.searchParams.get("surl");
    if (!surl) {
      console.error("No surl found in URL");
      return {
        error: "Invalid link format. Please provide a valid TeraBox link.",
        debug: { step: "no_surl", finalUrl },
      };
    }

    const pageHeaders = getHeaders(cookie, finalHost);
    response = await fetch(finalUrl, { headers: pageHeaders });
    const text = await response.text();

    const jsToken = findBetween(text, 'fn%28%22', '%22%29');
    const logid = findBetween(text, 'dp-logid=', '&');
    const bdstoken = findBetween(text, 'bdstoken":"', '"');

    if (!jsToken || !logid || !bdstoken) {
      const lower = text.toLowerCase();
      const looksLikeLogin = lower.includes('login') || lower.includes('passport') || lower.includes('captcha') || lower.includes('verify');
      console.error("Failed to extract tokens:", {
        jsToken: !!jsToken,
        logid: !!logid,
        bdstoken: !!bdstoken,
        htmlLength: text.length,
        finalUrl,
        looksLikeLogin,
      });
      return {
        error: "Authentication failed. Please check your cookies and try again.",
        debug: {
          step: "token_extraction",
          finalUrl,
          finalHost,
          htmlLength: text.length,
          foundJsToken: !!jsToken,
          foundLogid: !!logid,
          foundBdstoken: !!bdstoken,
          looksLikeLoginOrCaptcha: looksLikeLogin,
        },
      };
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

    const shareListUrl = `https://${finalHost}/share/list?${params}`;
    response = await fetch(shareListUrl, { headers: getHeaders(cookie, finalHost) });
    const data = await response.json();

    if (!data || !data.list || !data.list.length || data.errno) {
      console.error("API error:", data && data.errno, data && data.errmsg);
      return {
        error: "Unable to retrieve file information. Please verify your cookies are valid.",
        debug: { step: "share_list", shareListUrl, errno: data && data.errno, errmsg: data && data.errmsg },
      };
    }

    const fileInfo = data.list[0];

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

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Expose-Headers", "Content-Length");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed. Use POST request." });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { link, cookies } = body;

    if (!link) {
      res.status(400).json({ error: "Missing required parameter: link" });
      return;
    }

    if (!cookies) {
      res.status(400).json({ error: "Missing required parameter: cookies" });
      return;
    }

    const fileInfo = await getFileInfo(link, cookies);
    res.status(fileInfo.error ? 400 : 200).json(fileInfo);
  } catch (error) {
    console.error("Download API error:", error.message);
    res.status(500).json({ error: "Internal server error. Please try again." });
  }
}
