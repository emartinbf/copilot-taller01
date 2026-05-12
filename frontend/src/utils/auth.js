const TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY)
}

export function setTokens(accessToken, refreshToken) {
  sessionStorage.setItem(TOKEN_KEY, accessToken)
  if (refreshToken) {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  }
}

export function clearTokens() {
  sessionStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(REFRESH_TOKEN_KEY)
}

export function isAuthenticated() {
  return Boolean(getToken())
}
