const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function normalizeResponse(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  for (const key of ['results', 'items', 'data', 'records']) {
    if (Array.isArray(payload?.[key])) {
      return payload[key]
    }
  }

  return []
}

export async function fetchCollection(endpoint) {
  const response = await fetch(`${apiBase}${endpoint}`)

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  return normalizeResponse(await response.json())
}