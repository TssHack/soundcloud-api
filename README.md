# 🎵 SoundCloud API Proxy

A simple and useful proxy for accessing SoundCloud's unofficial API

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 🔍 Search and fetch track info from SoundCloud
- 🎧 Extract high-quality download links
- 🖼️ Get album artwork
- ⚡ Fast performance with Client ID caching
- 🔄 Automatic Client ID management

---

## 🚀 Installation

### Prerequisites

- Node.js version 18 or higher
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/TssHack/soundcloud-proxy.git
cd soundcloud-proxy

# Install dependencies
npm install

# Start the server
npm start
```

The server runs on port `3000` by default. To change the port:

```bash
PORT=8080 npm start
```

---

## 📖 Usage

### Get Track Info

```
GET /beta?url=https://soundcloud.com/user/track-name
```

#### Example with curl:

```bash
curl "http://localhost:3000/beta?url=https://soundcloud.com/username/track-name"
```

#### Response:

```json
{
  "title": "Track Title",
  "artist": "Artist Name",
  "url": "https://soundcloud.com/username/track-name",
  "thumbnail": "https://i1.sndcdn.com/artworks-xxxxx-t500x500.jpg",
  "download": "https://api-v2.soundcloud.com/...",
  "duration": 245.5,
  "developer": {
    "name": "Ehsan Fazli",
    "username": "@abj0o"
  }
}
```

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `CLIENT_ID` | SoundCloud Client ID | From file or code |

### Custom Client ID

Create a file named `soundcloud_client_id.txt` in the project root and put your Client ID in it:

```bash
echo "YOUR_CLIENT_ID_HERE" > soundcloud_client_id.txt
```

---

## 📡 Endpoints

| Route | Description |
|-------|-------------|
| `GET /` | Home page and guide |
| `GET /beta` | Get track info and download link |

---

## 🛠️ Development

```bash
# Install dependencies for development
npm install

# Run in development mode (with nodemon)
npm run dev
```

---

## 📧 Contact

- **GitHub:** [TssHack](https://github.com/TssHack)
- **Telegram:** [@abj0o](https://t.me/abj0o)
- **Email:** ehsanfazlinejad@gmail.com

---

## ⚠️ Disclaimer

> This project is created for educational and personal purposes only. Please comply with SoundCloud's terms of service.

---

## 📄 License

This project is released under the **MIT** License.

---
