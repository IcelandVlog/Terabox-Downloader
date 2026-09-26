import fs from "fs";
import path from "path";
import { URL } from "url";

export const ALLOWED_HOSTS = new Set([
  "terabox.app",
  "www.terabox.app",
  "teraboxshare.com",
  "www.teraboxshare.com",
  "terabox.com",
  "www.terabox.com",
  "1024terabox.com",
  "www.1024terabox.com",
  "teraboxlink.com",
  "www.teraboxlink.com",
  "dm.terabox.app",
]);

export function loadCookies(): Record<string, string> {
  let data: Record<string, any> | null = null;
  const cookieJson = process.env.COOKIE_JSON;
  if (cookieJson) {
    try {
      data = JSON.parse(cookieJson);
    } catch {
      const trimmed = cookieJson.trim();
      if (trimmed) {
        data = { ndus: trimmed };
      }
    }
  }

  if (!data) {
    const raw = process.env.TERABOX_COOKIES_JSON;
    if (raw) {
      try {
        data = JSON.parse(raw);
      } catch {}
    }
  }

  if (!data) {
    const filePath = process.env.TERABOX_COOKIES_FILE;
    if (filePath) {
      try {
        if (fs.existsSync(path.resolve(filePath))) {
          const fileContent = fs.readFileSync(path.resolve(filePath), "utf-8");
          data = JSON.parse(fileContent);
        }
      } catch {}
    }
  }

  if (data && typeof data === "object") {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(data)) {
      result[key] = String(value);
    }
    return result;
  }

  return {};
}

export function isValidShareUrl(u: string): boolean {
  try {
    const parsed = new URL(u);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return false;
    }
    const host = parsed.hostname.toLowerCase();
    if (!ALLOWED_HOSTS.has(host)) {
      return false;
    }
    return parsed.pathname.includes("/s/") || parsed.searchParams.has("surl");
  } catch {
    return false;
  }
}

export function extractSurl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.searchParams.has("surl")) {
      return parsed.searchParams.get("surl");
    }
    const match = parsed.pathname.match(/\/s\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  } catch {
    return null;
  }
}

export function formatBytes(bytes: number | string, decimals = 2): string {
  const b = typeof bytes === "string" ? parseInt(bytes, 10) : bytes;
  if (!+b) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(b) / Math.log(k));

  return `${parseFloat((b / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
