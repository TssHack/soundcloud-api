import express from "express";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

const clientIdStatic = "KKzJxmw11tYpCs6T24P4uUYhqmjalG6M";
const clientIdFile = path.join(process.cwd(), "soundcloud_client_id.txt");
const apiBase = "https://api-v2.soundcloud.com/";
const baseUrl = "https://soundcloud.com/";

function getClientId() {
  if (fs.existsSync(clientIdFile)) {
    const id = fs.readFileSync(clientIdFile, "utf8").trim();
    if (/^[a-zA-Z0-9]{32}$/.test(id)) return id;
  }
  return clientIdStatic;
}

async function makeRequest(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function callApi(endpoint, params = {}) {
  const client_id = getClientId();
  const query = new URLSearchParams({ ...params, client_id }).toString();
  const fullUrl = `${apiBase}${endpoint}?${query}`;
  return await makeRequest(fullUrl);
}

app.get("/", (req, res) => {
  res.send(`
    <h2>🎵 SoundCloud API Proxy</h2>
    <p>Use like this:</p>
    <pre>/track?url=https://soundcloud.com/user/track</pre>
  `);
});

app.get("/beta", async (req, res) => {
  const trackUrl = req.query.url;
  if (!trackUrl) return res.status(400).json({ error: "Missing URL" });

  const resolveUrl = `resolve?url=${encodeURIComponent(trackUrl)}`;
  const data = await callApi(resolveUrl);

  if (!data?.id) return res.status(404).json({ error: "Track not found" });

  let downloadUrl = null;
  if (data.media?.transcodings) {
    for (const t of data.media.transcodings) {
      if (t.format?.protocol === "progressive") {
        const stream = await makeRequest(`${t.url}?client_id=${getClientId()}`);
        if (stream?.url) {
          downloadUrl = stream.url;
          break;
        }
      }
    }
  }

  const thumb = (data.artwork_url || data.user?.avatar_url || "").replace("-large", "-t500x500");

  res.json({
    title: data.title,
    artist: data.user?.username,
    url: data.permalink_url,
    thumbnail: thumb,
    download: downloadUrl,
    duration: data.duration / 1000,
    developer: { name: "Ehsan Fazli", username: "@abj0o" }
  });
});

app.listen(PORT, () => console.log(`🚀 SoundCloud Proxy running on port ${PORT}`));
