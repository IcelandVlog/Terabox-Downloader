import type { VercelRequest, VercelResponse } from "@vercel/node";
import { tera } from "../src/lib/terabox";
import { isValidShareUrl, extractSurl, formatBytes } from "../src/lib/utils";

// NOTE: this in-memory cache only survives while a serverless instance stays
// "warm" - it is not shared across all invocations like it would be on a
// long-running server (Bun.serve). That's fine here, it's just a minor perf
// optimization, not something the API depends on for correctness.
const cache = new Map<string, { data: any; expiry: number }>();
const CACHE_DURATION = 2 * 60 * 60 * 1000;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const rawUrlParam = req.query.url;
  const targetUrlRaw = Array.isArray(rawUrlParam) ? rawUrlParam[0] : rawUrlParam;

  if (!targetUrlRaw) {
    res.status(200).json({
      name: "TeraBox API",
      version: "3.0",
      status: "operational",
      endpoints: {
        "/api": "Fetch files from Terabox link, e.g. /api?url=https://terabox.app/s/...",
      },
      timestamp: new Date().toISOString(),
    });
    return;
  }

  try {
    const startTime = Date.now();
    const targetUrl = targetUrlRaw.trim();

    if (!targetUrl.startsWith("http") || !isValidShareUrl(targetUrl)) {
      res.status(400).json({
        status: "error",
        url: targetUrl,
        message: "Invalid TeraBox share URL",
      });
      return;
    }

    const surl = extractSurl(targetUrl);
    if (!surl) {
      res.status(400).json({
        status: "error",
        url: targetUrl,
        message: "Could not extract surl from URL",
      });
      return;
    }

    let data;
    const cached = cache.get(surl);
    if (cached && Date.now() < cached.expiry) {
      data = cached.data;
    } else {
      data = await tera(surl);
      cache.set(surl, { data, expiry: Date.now() + CACHE_DURATION });
    }
    const responseTime = ((Date.now() - startTime) / 1000).toFixed(3) + "s";

    if (data && data.error) {
      res.status(400).json({
        status: "error",
        url: targetUrl,
        surl,
        error: data.error,
        response_time: responseTime,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    let filename, size, download, thumbs;
    if (data && data.list && data.list.length > 0) {
      const firstItem = data.list[0];
      filename = firstItem.server_filename;
      size = formatBytes(firstItem.size);
      download = firstItem.dlink;
      thumbs = firstItem.thumbs;
    }

    res.status(200).json({
      status: "success",
      response_time: responseTime,
      url: targetUrl,
      ...(filename && { filename }),
      ...(size && { size }),
      ...(download && { download }),
      ...(thumbs && { thumbs }),
    });
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: String(error),
      url: targetUrlRaw,
    });
  }
}
