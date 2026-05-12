const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

/**
 * Login with username and password.
 * Returns { access_token, refresh_token, token_type } on success,
 * or throws an Error with a descriptive message.
 */
export async function login(username, password) {
  const response = await fetch(`${BASE_URL}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Incorrect username or password')
    }
    throw new Error(`Login failed (${response.status})`)
  }

  return response.json()
}

/**
 * Call the protected endpoint using the stored access token.
 * Returns the JSON body on success or throws an Error.
 */
export async function getProtectedData(token) {
  const response = await fetch(`${BASE_URL}/protected`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Session expired. Please log in again.')
    }
    throw new Error(`Request failed (${response.status})`)
  }

  return response.json()
}
