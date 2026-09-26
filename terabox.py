from curl_cffi import requests
import re
import json

def tera(surl: str):
    short_url = surl[1:] if surl.startswith("1") else surl

    session = requests.Session(impersonate="chrome110")

    cookies = {
        "ndus": "YuLuQdPpeHuiMGEQDXpWDu6K2P4-xInj8YGEzswD"
    }

    session.cookies.update(cookies)

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/145.0.0.0 Safari/537.36"
    }

    first_url = f"https://dm.terabox.app/sharing/link?surl={surl}"
    response = session.get(first_url, headers=headers)

    match = re.search(r'fn%28%22(.*?)%22%29', response.text)
    jsToken = match.group(1)
    api_url = "https://dm.terabox.app/share/list"

    params = {
        "app_id": "250528",
        "jsToken": jsToken,
        "site_referer": "https://www.terabox.app/",
        "shorturl": short_url,
        "root": "1"
    }

    api_headers = {
        "Host": "dm.terabox.app",
        "User-Agent": headers["User-Agent"],
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "X-Requested-With": "XMLHttpRequest",
        "Referer": f"https://dm.terabox.app/sharing/link?surl={short_url}&clearCache=1",
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "https://dm.terabox.app"
    }

    api_response = session.get(api_url, params=params, headers=api_headers)
    
    return json.dumps(api_response.json())

if __name__ == "__main__":
    surl = "1HSEb8PZRUE7Z1Tvd3ZtT0g"
    print(tera(surl))
