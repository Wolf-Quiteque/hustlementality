const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export async function getSiteContent(page) {
  try {
    const res = await fetch(`${API_URL}/content?page=${page}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};
    const json = await res.json();
    const items = json.data || json || [];
    return Object.fromEntries(items.map((item) => [item.key, item]));
  } catch {
    return {};
  }
}

export async function getContentByKey(key) {
  try {
    const res = await fetch(`${API_URL}/content/${key}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || json || null;
  } catch {
    return null;
  }
}

export async function getActiveCruises() {
  try {
    const res = await fetch(`${API_URL}/cruises`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || json || [];
  } catch {
    return [];
  }
}

export async function getCruiseBySlug(slug) {
  try {
    const res = await fetch(`${API_URL}/cruises/slug/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || json || null;
  } catch {
    return null;
  }
}

export async function getCruisePackages(cruiseId) {
  try {
    const res = await fetch(`${API_URL}/cruises/${cruiseId}/packages`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || json || [];
  } catch {
    return [];
  }
}

export async function getCruiseItinerary(cruiseId) {
  try {
    const res = await fetch(`${API_URL}/cruises/${cruiseId}/itinerary`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || json || [];
  } catch {
    return [];
  }
}

// Helper to safely parse JSON content values
export function parseJson(content, key, fallback = []) {
  try {
    const item = content[key];
    if (!item) return fallback;
    return JSON.parse(item.value);
  } catch {
    return fallback;
  }
}

// Helper to get text content value with fallback
export function text(content, key, fallback = "") {
  return content[key]?.value || fallback;
}
