<div align="center">

# ☁️ TeraBox Downloader API

<p align="center">
  <img src="https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white" alt="Bun"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python"/>
</p>

A fast, lightweight, and efficient **TeraBox direct download link generator API** built with **Bun** and **TypeScript**. Easily fetch file details, thumbnails, and direct download links seamlessly!

---
</div>

## ✨ Features

- 🚀 **Ultra-Fast Performance**: Powered by Bun for rapid execution.
- 🔗 **Direct Link Extraction**: Effortlessly bypass Terabox pages and grab direct download links.
- 📦 **File Metadata**: Get file names, sizes, and thumbnails out of the box.
- 🐳 **Docker Ready**: Easy deployment using Docker seamlessly.
- 💾 **Built-in Caching**: Features a caching system to reduce redundant requests and boost response times.
- 🌐 **CORS Support**: Configured correctly to serve requests everywhere.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- [Bun](https://bun.sh/)
- [Python 3](https://www.python.org/downloads/) (For the Python wrapper, if needed)
- [Docker](https://www.docker.com/) (Optional, for containerized deployments)

## 🚀 Getting Started

### 1️⃣ Local Development

1. **Clone the repository** and navigate into the directory.
2. **Install dependencies**:
   ```bash
   bun install
   ```
3. **Run the server in development mode**:
   ```bash
   bun run dev
   ```
   *The server will start at `http://localhost:5000`.*

### 2️⃣ Production Built

To run the API in a production environment:

```bash
bun run start
```

### 3️⃣ Docker Deployment

Want to deploy it with Docker? Easy:

```bash
# Build the Docker image
docker build -t terabox-dl-api .

# Run the container
docker run -p 5000:5000 terabox-dl-api
```

## 🔌 API Documentation

### Get File Details
Retrieve the download link and details for a given TeraBox share URL.

**Endpoint:** `/api`
**Method:** `GET`

#### Query Parameters
| Parameter | Type   | Description                                          | Required |
|-----------|--------|------------------------------------------------------|----------|
| `url`     | String | The TeraBox share URL (e.g., `https://terabox.app/s/...`) | ✅ Yes   |

#### Example Request
```bash
curl -X GET "http://localhost:5000/api?url=https://terabox.app/s/1HSEb8PZRUE7Z1Tvd3ZtT0g"
```

#### Example Response
```json
{
  "status": "success",
  "response_time": "1.234s",
  "url": "https://terabox.app/s/1HSEb8PZRUE7Z1Tvd3ZtT0g",
  "filename": "amazing_video.mp4",
  "size": "500.00 MB",
  "download": "https://d.terabox.app/...",
  "thumbs": "https://thumb.terabox.app/..."
}
```

## 🤝 Credits & Acknowledgements

Special huge thanks to our amazing contributors and channels who made this possible:

🌟 **[@cantarella_wuwa](https://t.me/cantarella_wuwa)**
🌟 **[@cantarellabots channel](https://t.me/cantarellabots)**

Their continuous support and resources are deeply appreciated by the community! 💖

---
<p align="center">
  <i>Developed with ❤️ for the open-source community.</i>
</p>
