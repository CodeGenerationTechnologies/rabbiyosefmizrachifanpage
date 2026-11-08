# rabbiyosefmizrachifanpage

An elusive, 3D, immersive web portal that consolidates all **@rabbiyosefmizrachifanpage** social media accounts and promotes the **Official LinkMe** and digital lecture archives of world-renowned Kiruv speaker **Rabbi Yosef Mizrachi (הרב יוסף מזרחי)**.

Built with depth around the Rabbi's central mission: **Kiruv** — bringing both Jew and Gentile to the word of Hashem.

---

## 🌟 Key Highlights & Features

1. **👑 Promoted Official LinkMe Showcase**
   - High-visibility hero banner linking directly to Rabbi Yosef Mizrachi's central LinkMe: [`https://link.me/rabbiyosefmizrachi`](https://link.me/rabbiyosefmizrachi).
   - Instant one-click copy, verified status badges, and mobile QR code sharing modal.

2. **🎬 Interactive 3D Highlight Reels (Hover Peak Moment Auto-Play)**
   - **Reel 1: The Rabbi's Latest Video Releases** (Current events, Rosh Hashanah/Yom Kippur forecasts, AI analysis, repentance masterclasses).
   - **Reel 2: The Rabbi's Most Popular Video Releases** (Millions of views: *The Purpose of Life*, *Torah and Science*, *The End of Days Film*, *The Debate with Christian Professor*, *Creation & Genesis*).
   - **Reel 3: Fan Page Highlights & Viral Shorts** (*Who is superior, a righteous Gentile or a wicked Jew?*, *How do you know God's word?*, *Biblical genealogies & prophecy*).
   - **Hover Playback**: Hovering over any lecture card instantly triggers an auto-playing muted preview starting precisely at the peak / most played moment of the video.
   - **New Tab Source Navigation**: Clicking any card or CTA opens the official video on YouTube or Divine Information in a new tab (`target="_blank" rel="noopener noreferrer"`).

3. **🛡️ Clear Distinction: Official Sanctioned vs. Fan-Curated Channels**
   - Complete directory with search & category filtering:
     - **Official Verified Portals**: Official LinkMe, Divine Information Website, Official YouTube `@RabbiYosefMizrachi`, Google Play Android App, Apple App Store iOS App, TorahAnytime (Speaker #111), Apple Podcasts, Spotify, Rumble, Kick, Twitch, Soundcloud, Official Instagram, Facebook, TikTok, Twitter/X, Wikipedia.
     - **Fan-Based Accounts**: YouTube `@RabbiYosefMizrachiFanPage`, TikTok, Instagram, Facebook Community Group, Telegram Chizuk Channel, and Twitter/X.
   - Individual platform logos and badges for instant visual clarity.

4. **✨ Sacred Kiruv Philosophy: Jew & Gentile in Hashem's Divine Plan**
   - The 4 Core Pillars of Divine Outreach.
   - The **7 Universal Noahide Laws** for Gentiles / Nations of the World (emphasizing that all righteous people of the earth have an eternal share in Gan Eden without converting).
   - The 613 Mitzvot and Teshuva for the Jewish Nation.
   - Rotating Wisdom Quote Carousel featuring seminal teachings by Rabbi Mizrachi.

5. **🌌 3D Cosmic Canvas & Celestial Audio Experience**
   - Interactive Three.js particle starfield, sacred geometry rings, rising golden embers, and mouse parallax depth.
   - 432Hz ambient celestial sanctuary sound generator built with the Web Audio API (toggleable in the header).

---

## 🛡️ Secure Daily vs. Dynamic Video Update Architecture

### Why Daily Automated Server/Edge Sync is Most Secure:
1. **Zero Client-Side API Exposure**: Client browsers never receive private API tokens or scrape third-party websites directly (preventing token theft, quota abuse, and rate limits).
2. **Strict Schema & XSS Sanitization**: External titles and descriptions are sanitized through an HTML-entity encoder before being written to disk, preventing Cross-Site Scripting (XSS).
3. **Regex ID Guarding**: Every YouTube video ID is strictly validated with `^[a-zA-Z0-9_-]{11}$`.
4. **Offline Resilience & Zero Downtime**: The website always serves an immutable, verified cached payload (`public/data/videos_feed.json`). If YouTube or Divine Information experience downtime, the website continues to function seamlessly with fallback data.
5. **Dynamic Stale-While-Revalidate**:
   - The browser loads cached videos instantaneously (0ms FOUC).
   - In the background, it revalidates against `/data/videos_feed.json`.
   - Users can click **"Check for Fresh Videos"** to trigger an on-demand revalidation.

### Daily Automation Options:
* **GitHub Actions Workflow**: Included in [`.github/workflows/daily-video-update.yml`](file:///Users/nathanjosephalard/.gemini/antigravity/scratch/rabbiyosefmizrachifanpage/.github/workflows/daily-video-update.yml) to automatically fetch, sanitize, and commit updates every day at 03:00 UTC.
* **Manual / Cron Trigger**:
  ```bash
  npm run update-feed
  ```

---

## 🚀 Running the Project Locally

```bash
# Navigate to the project directory
cd /Users/nathanjosephalard/.gemini/antigravity/scratch/rabbiyosefmizrachifanpage

# Install dependencies (if not already installed)
npm install

# Start the dev server
npm run dev

# Or build for production
npm run build
npm run preview
```

Server runs locally at: **`http://localhost:5173/`**
