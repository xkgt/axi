import { ref } from "vue";
import { Configuration, AdminApi, AuthApi, MessagesApi, ReportsApi, BarragesApi, ScoresApi } from "./server-api";
import globalAxios from "axios";

// ---- 后端 API 配置 ----
export const API_BASE = window.VITE_API_URL || "http://127.0.0.1:8000";

export const config = new Configuration({
  basePath: API_BASE,
  accessToken: localStorage.getItem("access_token"),
});

const client = globalAxios.create({ baseURL: API_BASE });

// ---- Token 管理 ----
function getAccessToken() {
  return localStorage.getItem("access_token");
}
function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}
function saveTokens(access, refresh) {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
  config.accessToken = access;
}
function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  config.accessToken = null;
}

let isRefreshing = false;
let refreshPromise = null;

async function refreshAccessToken() {
  const refresh = getRefreshToken();
  if (!refresh) return null;
  try {
    const resp = await globalAxios.post(`${API_BASE}/auth/refresh`, { refresh_token: refresh });
    const newAccess = resp.data.access_token;
    if (newAccess) {
      localStorage.setItem("access_token", newAccess);
      config.accessToken = newAccess;
    }
    return newAccess;
  } catch {
    clearTokens();
    return null;
  }
}

// 请求拦截器
client.interceptors.request.use((req) => {
  const token = getAccessToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    config.accessToken = token;
  }
  return req;
});

// 响应拦截器：401 自动刷新
client.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retried) {
      error.config._retried = true;
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshAccessToken().finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        });
      }
      const newToken = await refreshPromise;
      if (newToken) {
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return client.request(error.config);
      }
      logout();
    }
    return Promise.reject(error);
  }
);

// ---- 类型化 API 客户端 ----
export const adminApi = new AdminApi(config, undefined, client);
export const authApi = new AuthApi(config, undefined, client);
export const messagesApi = new MessagesApi(config, undefined, client);
export const reportsApi = new ReportsApi(config, undefined, client);
export const barragesApi = new BarragesApi(config, undefined, client);
export const scoresApi = new ScoresApi(config, undefined, client);

export { client };

// ---- 用户状态 ----
export const user = ref();

export function logout() {
  clearTokens();
  setUser(null);
}

export function setUser(_user) {
  if (_user) {
    _user.username = _user.account ?? _user.username;
    _user.avatar = _user.avatar_url ?? _user.avatar;
  }
  user.value = _user;
}

export { saveTokens, getAccessToken, getRefreshToken, clearTokens };

// ---- 获取当前用户 ----
export async function fetchUserInfo() {
  if (!getAccessToken()) return null;
  try {
    const resp = await authApi.getMeAuthMeGet();
    setUser(resp.data);
    return resp.data;
  } catch {
    return null;
  }
}

// ---- 工具 ----
export const formatTime = (timeString) => {
  if (!timeString) return "";
  const d = new Date(timeString);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

export async function sha256(text) {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hash = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, "0")).join("")
}

export const SCORE_SALT = "axiweb-danmaku-8976"

// ---- 诗 ----
export const poetry = ref({});
export async function updatePoetry() {
  try {
    const resp = await globalAxios.get("https://v1.jinrishici.com/all");
    poetry.value = resp.data;
  } catch {
    poetry.value = "获取失败了:(";
  }
}
