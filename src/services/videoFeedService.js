// Secure Client-Side Video Feed Service with Stale-While-Revalidate

import { LATEST_RELEASES, POPULAR_RELEASES, FAN_HIGHLIGHTS } from '../data/videos.js';

const CACHE_KEY = 'rym_secure_video_feed_v1';
const CACHE_TTL_MS = 1000 * 60 * 60 * 12; // 12 hours client revalidation window

// Strict validator for video objects
function validateVideo(v) {
  if (!v || typeof v !== 'object') return false;
  if (typeof v.youtubeId !== 'string' || !/^[a-zA-Z0-9_-]{11}$/.test(v.youtubeId)) return false;
  if (typeof v.title !== 'string' || v.title.length === 0) return false;
  return true;
}

export class VideoFeedService {
  constructor() {
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(cb => cb !== callback);
    };
  }

  notify(data) {
    this.subscribers.forEach(cb => {
      try { cb(data); } catch (e) { console.error('Feed subscriber error:', e); }
    });
  }

  // Load feed (from cache first, then revalidate in background)
  async getFeed() {
    // 1. Try local cache
    let cached = null;
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.data && (Date.now() - parsed.timestamp < CACHE_TTL_MS)) {
          cached = parsed.data;
        }
      }
    } catch (e) {
      console.warn('LocalStorage access issue:', e);
    }

    // 2. Trigger background revalidation
    this.revalidateFeed();

    // 3. Return cached data if available, otherwise fallback to bundled baseline data
    if (cached) {
      return cached;
    }

    return {
      metadata: {
        generatedAt: new Date().toISOString(),
        isBaseline: true
      },
      latest: LATEST_RELEASES,
      popular: POPULAR_RELEASES,
      fan: FAN_HIGHLIGHTS
    };
  }

  async revalidateFeed() {
    try {
      // Cache-busting fetch to get fresh daily feed
      const res = await fetch(`/data/videos_feed.json?t=${Date.now()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      if (!json || !json.latest || !Array.isArray(json.latest)) {
        throw new Error('Invalid feed schema');
      }

      // Security sanitization & schema enforcement
      const sanitizedLatest = json.latest.filter(validateVideo);
      const sanitizedPopular = (json.popular || []).filter(validateVideo);
      const sanitizedFan = (json.fan || []).filter(validateVideo);

      const verifiedFeed = {
        metadata: json.metadata || { generatedAt: new Date().toISOString() },
        latest: sanitizedLatest.length > 0 ? sanitizedLatest : LATEST_RELEASES,
        popular: sanitizedPopular.length > 0 ? sanitizedPopular : POPULAR_RELEASES,
        fan: sanitizedFan.length > 0 ? sanitizedFan : FAN_HIGHLIGHTS
      };

      // Store in cache
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: verifiedFeed
        }));
      } catch (e) {}

      // Notify UI
      this.notify(verifiedFeed);
      return verifiedFeed;
    } catch (err) {
      console.info('Using immutable fallback video feed:', err.message);
      return null;
    }
  }
}

export const videoFeedService = new VideoFeedService();
