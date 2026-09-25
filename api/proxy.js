const DEFAULT_COOKIE = "ndus=YeF0xvEteHuibCedALNYs70N6S9NkRFgaxOxkqSH"; // Fallback cookie

function getDLHeaders(cookie) {
  return {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Referer": "https://1024terabox.com/",
    "DNT": "1",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
    "Cookie": cookie || DEFAULT_COOKIE,
  };
}

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Range");
  res.setHeader("Access-Control-Expose-Headers", "Content-Length,Content-Range,Content-Disposition");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed. Use GET request." });
    return;
  }

  const { url: downloadUrl, filename: fileName, cookie } = req.query || {};

  if (!downloadUrl) {
    res.status(400).json({ error: "Missing required parameter: url" });
    return;
  }

  try {
    const headers = getDLHeaders(cookie);

    // Handle range requests for video streaming/partial downloads
    const rangeHeader = req.headers.range;
    if (rangeHeader) {
      headers.Range = rangeHeader;
    }

    const response = await fetch(downloadUrl, {
      headers,
      redirect: "follow",
    });

    if (!response.ok && response.status !== 206) {
      console.error(`Failed to fetch download: ${response.status}`);
      res.status(502).json({ error: "Download service temporarily unavailable." });
      return;
    }

    res.status(response.status);
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.setHeader("Content-Type", response.headers.get("Content-Type") || "application/octet-stream");

    if (fileName) {
      res.setHeader("Content-Disposition", `inline; filename="${encodeURIComponent(fileName)}"`);
    }

    if (response.headers.get("Content-Range")) {
      res.setHeader("Content-Range", response.headers.get("Content-Range"));
      res.setHeader("Accept-Ranges", "bytes");
    }

    if (response.headers.get("Content-Length")) {
      res.setHeader("Content-Length", response.headers.get("Content-Length"));
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    res.end(buffer);
  } catch (error) {
    console.error("Proxy error:", error.message);
    res.status(500).json({ error: "Download service error occurred." });
  }
}
