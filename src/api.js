const API_BASE = "https://start-production-c765.up.railway.app"

async function getCsrfToken() {
  await fetch(`${API_BASE}/api/csrf/`, {
    method: "GET",
    credentials: "include",
  })

  const cookie = document.cookie
    .split("; ")
    .find((c) => c.startsWith("csrftoken="))

  return cookie ? cookie.split("=")[1] : ""
}

export async function apiGet(path) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    credentials: "include",
  })
  return res.json()
}

export async function apiPost(path, body) {
  const csrf = await getCsrfToken()

  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrf,
    },
    body: JSON.stringify(body),
  })

  const data = await res.json()
  return { ok: res.ok, status: res.status, data }
}
