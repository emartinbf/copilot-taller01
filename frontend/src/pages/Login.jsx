import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/auth'
import { setTokens } from '../utils/auth'
import styles from './Login.module.css'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await login(username, password)
      setTokens(data.access_token, data.refresh_token)
      navigate('/welcome')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.background} aria-hidden="true" />

      <div className={styles.shell}>
        <div className={styles.card}>
          <header className={styles.header}>
            <div className={styles.logoMark} aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2L3 6.5V13.5L10 18L17 13.5V6.5L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M10 2V18M3 6.5L17 13.5M17 6.5L3 13.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4"/>
              </svg>
            </div>
            <h1 className={styles.title}>Compliance Platform</h1>
            <p className={styles.subtitle}>Sign in to your account</p>
          </header>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                className={styles.input}
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
                required
                disabled={loading}
                placeholder="Enter your username"
              />
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className={styles.input}
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={loading}
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <p className={styles.error} role="alert">{error}</p>
            )}

            <button
              type="submit"
              className={styles.button}
              disabled={loading || !username || !password}
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
