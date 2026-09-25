# 🚀 TeraBox Web - Professional File Downloader

<div align="center">

![TeraBox Web](https://img.shields.io/badge/TeraBox-Web-blue?style=for-the-badge&logo=download&logoColor=white)
![Version](https://img.shields.io/badge/version-2.0.1-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

**Fast, secure, and reliable file downloads from TeraBox with no limits.**

[🌐 Live Demo](https://terasnap.netlify.app/) • [📖 Documentation](https://terasnap.netlify.app/download) • [🐙 GitHub](https://github.com/Itz-Ashlynn/Terabox-Web)

</div>

---

## 📖 Overview

**TeraBox Web** is a modern, professional web application that allows you to download files from TeraBox with direct download links and proxy support. Built with cutting-edge technologies including React 18, TypeScript, and Tailwind CSS, it features a beautiful glassmorphism UI, dark/light mode, and comprehensive API documentation.

### 🎯 Key Benefits

- ✅ **No Download Limits** - Download files of any size without restrictions
- ✅ **Fast & Reliable** - Serverless architecture for optimal performance  
- ✅ **User-Friendly** - Intuitive interface with step-by-step guidance
- ✅ **Mobile Responsive** - Works perfectly on all devices
- ✅ **Professional Design** - Modern UI with smooth animations
- ✅ **API Ready** - Full REST API for developers

---

## 🚀 Quick Start

### 🌐 Try It Now
Visit **[https://terasnap.netlify.app/](https://terasnap.netlify.app/)** to start downloading files immediately!

### 🛠️ For Developers

```bash
# 1. Clone the repository
git clone https://github.com/Itz-Ashlynn/Terabox-Web.git
cd Terabox-Web

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open http://localhost:5173
```

---

## 📋 Table of Contents

- [Features](#-features)
- [How to Use](#-how-to-use)
- [Cookie Setup Guide](#-cookie-setup-guide)
- [API Documentation](#-api-documentation)
- [Installation](#-installation)
- [Technology Stack](#-technology-stack)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Support](#-support)

---

## ✨ Features

### 🎯 Core Features
| Feature | Description |
|---------|-------------|
| 🔗 **Direct Downloads** | Get direct download links from TeraBox URLs |
| 🛡️ **Proxy Support** | External proxy integration for faster downloads |
| 🌙 **Dark/Light Mode** | Beautiful theme switching with system preference detection |
| 📱 **Mobile Responsive** | Optimized for all devices and screen sizes |
| ⚡ **Fast & Reliable** | Serverless architecture for optimal performance |
| 🍪 **Cookie Management** | Easy NDUS cookie setup with detailed guide |

### 🎨 Design & User Experience
| Feature | Description |
|---------|-------------|
| 🎭 **Modern UI/UX** | Clean, professional interface with smooth animations |
| ✨ **Glassmorphism Effects** | Beautiful backdrop blur and transparency effects |
| 📱 **Responsive Design** | Mobile-first approach with perfect scaling |
| ♿ **Accessibility** | ARIA labels, keyboard navigation, and screen reader support |
| ⏳ **Loading States** | Elegant loading animations and error handling |

### 🔧 Technical Features
| Feature | Description |
|---------|-------------|
| 🌐 **REST API** | Full-featured API with comprehensive documentation |
| 🔄 **CORS Handling** | Serverless functions to bypass browser limitations |
| 🛡️ **Error Handling** | Robust error management with user-friendly messages |
| 🔒 **Type Safety** | Full TypeScript implementation |
| 🚀 **SEO Optimized** | Meta tags, Open Graph, and mobile optimization |

---

## 🎯 How to Use

### 📱 Web Interface (Recommended)

1. **🌐 Visit the Website**
   - Go to **[https://terasnap.netlify.app/](https://terasnap.netlify.app/)**

2. **🍪 Setup Your Cookie** 
   - Follow the [Cookie Setup Guide](#-cookie-setup-guide) below
   - Enter your NDUS cookie in the application

3. **📎 Enter TeraBox URL**
   - Paste your TeraBox share link in the input field
   - Example: `https://1024terabox.com/s/1abc123def456`

4. **⬇️ Download Your File**
   - Choose between direct download or proxy download
   - Click download and enjoy your file!

### 🔧 API Usage (For Developers)

#### Base URL
```
https://terasnap.netlify.app
```

#### Example Request
```bash
curl -X POST "https://terasnap.netlify.app/api/download" \
  -H "Content-Type: application/json" \
  -d '{
    "link": "https://1024terabox.com/s/1abc123def456",
    "cookies": "ndus=YourCookieValueHere"
  }'
```

#### Example Response
```json
{
  "file_name": "example_file.zip",
  "download_link": "https://direct-download-link.com/file",
  "thumbnail": "https://thumbnail-url.com/thumb.jpg",
  "file_size": "125.50 MB",
  "size_bytes": 131621888,
  "proxy_url": "https://terabox.ashlynn.workers.dev/proxy?url=encoded_url&file_name=example_file.zip&cookie=encoded_cookie"
}
```

---

## 🍪 Cookie Setup Guide

### 📋 Step-by-Step Instructions

<details>
<summary><b>🔍 Method 1: Using Cookies Editor Extension (Recommended)</b></summary>

#### Step 1: Install Extension
- **Chrome**: [Cookies Editor - Chrome Web Store](https://chrome.google.com/webstore)
- **Firefox**: [Cookies Editor - Firefox Add-ons](https://addons.mozilla.org)

#### Step 2: Login to TeraBox
1. Go to [https://terabox.com](https://terabox.com)
2. Login to your account

#### Step 3: Activate Session
1. Find any video file on TeraBox
2. Start playing it (this activates your session)

#### Step 4: Extract Cookie
1. Click the Cookies Editor extension icon
2. Search for cookie named `ndus`
3. Copy the entire cookie value

#### Step 5: Use in Application
- Paste the cookie value in the format: `ndus=YOUR_COPIED_VALUE`

</details>

<details>
<summary><b>🔧 Method 2: Using Browser Developer Tools</b></summary>

#### Step 1: Open Developer Tools
- Press `F12` or right-click → "Inspect"

#### Step 2: Navigate to Cookies
- Go to **Application** tab
- Click **Cookies** → **https://terabox.com**

#### Step 3: Find NDUS Cookie
- Look for cookie named `ndus`
- Copy its value

#### Step 4: Use in Application
- Enter: `ndus=YOUR_COPIED_VALUE`

</details>

### ⚠️ Important Tips

- **🔄 Cookie Expiration**: NDUS cookies expire after some time. Generate a new one if you get authentication errors
- **👑 Account Type**: Both free and premium accounts work, but premium offers faster speeds
- **🔒 Security**: Never share your NDUS cookie with others

---

## 🔐 API Documentation

### 📊 Request/Response Format

| Method | Endpoint | Content-Type |
|--------|----------|--------------|
| `POST` | `/api/download` | `application/json` |

### 📝 Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `link` | string | ✅ | TeraBox share URL |
| `cookies` | string | ✅ | TeraBox ndus cookie value |

### 📤 Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `file_name` | string | Original filename from TeraBox |
| `download_link` | string | Direct download URL from TeraBox |
| `thumbnail` | string | Preview image URL (if available) |
| `file_size` | string | Human-readable file size |
| `size_bytes` | number | File size in bytes |
| `proxy_url` | string | External proxy download URL |

### 🔢 HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | ✅ Success - File information retrieved |
| `400` | ❌ Bad Request - Invalid parameters |
| `404` | ❌ Not Found - Endpoint not found |
| `500` | ❌ Server Error - Internal error occurred |

---

## 🛠️ Installation

### 📋 Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Package managers
- **Git** - Version control

### 🚀 Local Development Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/Itz-Ashlynn/Terabox-Web.git
   cd Terabox-Web
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open Browser**
   ```
   http://localhost:5173
   ```

### 🏗️ Build for Production

```bash
npm run build
# or
yarn build
```

---

## 🛠️ Technology Stack

### 🎨 Frontend
- **⚛️ React 18** - Modern React with hooks and functional components
- **📘 TypeScript** - Type-safe development with full IntelliSense
- **🎨 Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **🧭 React Router** - Client-side routing for SPA navigation
- **🎭 Lucide React** - Beautiful, customizable icons

### ☁️ Backend
- **🌐 Vercel Serverless Functions** - API endpoints under `/api`
- **🔄 CORS Handling** - Cross-origin request management
- **🛡️ Proxy Integration** - External proxy service integration

### 🔧 Development Tools
- **⚡ Vite** - Fast build tool and development server
- **📦 npm/yarn** - Package management
- **🔧 ESLint** - Code linting and formatting
- **🎯 PostCSS** - CSS processing and optimization

### 🌐 Deployment
- **🚀 Vercel** - Hosting, CI/CD, and serverless functions
- **🔄 Git Integration** - Automated deployment on every push
- **📈 Analytics** - Performance monitoring and user analytics

---

## 🌐 Deployment

### 🚀 Vercel Deployment (Recommended)

1. **Push Repository to GitHub**
   - Make sure this project (with the `api/` folder and `vercel.json`) is pushed to your GitHub repo.

2. **Import into Vercel**
   - Login to [Vercel](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. **Configure Build Settings** (auto-detected from `vercel.json`)
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Deploy**
   - Click "Deploy" — Vercel will build the site and automatically deploy the functions in `api/download.js` and `api/proxy.js` as serverless endpoints (`/api/download`, `/api/proxy`)

### 📁 Manual Deployment

1. **Build Project**
   ```bash
   npm run build
   ```

2. **Deploy `dist` folder** to your hosting provider

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🚀 Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### 📋 Development Guidelines

- **Code Style**: Follow existing TypeScript and React patterns
- **Testing**: Ensure your changes don't break existing functionality
- **Documentation**: Update documentation for new features
- **Responsive**: Test on mobile devices and different screen sizes
- **Accessibility**: Maintain ARIA labels and keyboard navigation

### 🎯 Areas for Contribution

- 🐛 **Bug Fixes** - Report and fix bugs
- ✨ **New Features** - Add new functionality
- 🎨 **UI/UX Improvements** - Enhance design and user experience
- 📖 **Documentation** - Improve docs and guides
- 🔧 **Performance** - Optimize speed and efficiency
- 🌐 **Internationalization** - Add multi-language support

---

## 📞 Support

### 🆘 Need Help?

1. **📖 Check Documentation** - Most common issues are covered here
2. **🔍 Search Issues** - Someone might have already reported it
3. **🐛 Create Issue** - Provide detailed information about the problem
4. **💬 Contact Author** - Reach out to [Ashlynn](https://t.me/Ashlynn_Repository)

### 🔗 Useful Links

- **🌐 Live Website**: [https://terasnap.netlify.app/](https://terasnap.netlify.app/)
- **📖 API Documentation**: [https://terasnap.netlify.app/download](https://terasnap.netlify.app/download)
- **🐙 GitHub Repository**: [https://github.com/Itz-Ashlynn/Terabox-Web](https://github.com/Itz-Ashlynn/Terabox-Web)
- **📞 Contact Author**: [https://t.me/Ashlynn_Repository](https://t.me/Ashlynn_Repository)

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 TeraBox Web - Ashlynn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- **TeraBox** - For providing the file sharing service
- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Netlify** - For hosting and serverless functions
- **Lucide** - For the beautiful icon set

---

<div align="center">

**⭐ Star this repository if you found it helpful! ⭐**

Made with ❤️ by [Ashlynn](https://t.me/Ashlynn_Repository)

[🌐 Live Demo](https://terasnap.netlify.app/) • [🐙 GitHub](https://github.com/Itz-Ashlynn/Terabox-Web) • [📞 Contact](https://t.me/Ashlynn_Repository)

</div>