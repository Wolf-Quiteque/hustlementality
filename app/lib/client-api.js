const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

const TOKEN_KEY = "hm_access_token";
const REFRESH_KEY = "hm_refresh_token";

export function getTokens() {
  if (typeof window === "undefined") return { accessToken: null, refreshToken: null };
  return {
    accessToken: localStorage.getItem(TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_KEY),
  };
}

export function setTokens(accessToken, refreshToken) {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
}

export function clearTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

let isRefreshing = false;
let refreshPromise = null;

async function refreshAccessToken() {
  const { refreshToken } = getTokens();
  if (!refreshToken) throw new Error("No refresh token");

  // Deduplicate concurrent refresh attempts
  if (isRefreshing) return refreshPromise;
  isRefreshing = true;

  refreshPromise = fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  })
    .then(async (res) => {
      if (!res.ok) throw new Error("Refresh failed");
      const data = await res.json();
      const d = data.data || data;
      setTokens(d.accessToken, d.refreshToken);
      return d.accessToken;
    })
    .finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });

  return refreshPromise;
}

async function apiFetch(path, options = {}) {
  const { accessToken } = getTokens();
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...options.headers,
  };
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  let res = await fetch(`${API_URL}${path}`, { ...options, headers });

  // Auto-refresh on 401
  if (res.status === 401 && accessToken) {
    try {
      const newToken = await refreshAccessToken();
      headers["Authorization"] = `Bearer ${newToken}`;
      res = await fetch(`${API_URL}${path}`, { ...options, headers });
    } catch {
      clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      throw new Error("Session expired");
    }
  }

  if (res.status === 401) {
    clearTokens();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("Session expired");
  }

  const json = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = json.message || json.error || `Request failed (${res.status})`;
    const err = new Error(Array.isArray(msg) ? msg.join(", ") : msg);
    err.status = res.status;
    err.data = json;
    throw err;
  }

  return json.data !== undefined ? json.data : json;
}

const api = {
  get: (path) => apiFetch(path, { method: "GET" }),
  post: (path, body) =>
    apiFetch(path, { method: "POST", body: JSON.stringify(body) }),
  postForm: (path, formData) =>
    apiFetch(path, { method: "POST", body: formData }),
  patch: (path, body) =>
    apiFetch(path, { method: "PATCH", body: JSON.stringify(body) }),
  put: (path, body) =>
    apiFetch(path, { method: "PUT", body: JSON.stringify(body) }),
  del: (path) => apiFetch(path, { method: "DELETE" }),
};

export default api;
