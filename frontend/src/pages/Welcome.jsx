import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProtectedData } from '../api/auth'
import { getToken, clearTokens } from '../utils/auth'
import styles from './Welcome.module.css'

const microsoftCertifications2026 = [
  {
    name: 'Microsoft Certified: Azure Data Scientist Associate',
    retirementDate: '1 de junio de 2026',
    category: 'Azure',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-data-scientist/',
  },
  {
    name: 'Microsoft Certified: Azure AI Engineer Associate',
    retirementDate: '30 de junio de 2026',
    category: 'Azure AI',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/',
  },
  {
    name: 'Microsoft Certified: Azure Developer Associate',
    retirementDate: '31 de julio de 2026',
    category: 'Desarrollo',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-developer/',
  },
  {
    name: 'Microsoft Certified: Azure Security Engineer Associate',
    retirementDate: '31 de agosto de 2026',
    category: 'Seguridad',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-security-engineer/',
  },
]

export default function Welcome() {
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = getToken()
    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    getProtectedData(token)
      .then(data => {
        setMessage(data.message)
        // Extract username from the message
        const match = data.message.match(/Hello, (.+?)!/)
        if (match) setUsername(match[1])
      })
      .catch(err => {
        setError(err.message)
        if (err.message.includes('Session expired')) {
          clearTokens()
          setTimeout(() => navigate('/login', { replace: true }), 2000)
        }
      })
      .finally(() => setLoading(false))
  }, [navigate])

  function handleLogout() {
    clearTokens()
    navigate('/login', { replace: true })
  }

  return (
    <div className={styles.page}>
      <div className={styles.background} aria-hidden="true" />

      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <div className={styles.brand}>
            <div className={styles.logoMark} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2L3 6.5V13.5L10 18L17 13.5V6.5L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M10 2V18M3 6.5L17 13.5M17 6.5L3 13.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4"/>
              </svg>
            </div>
            <span className={styles.brandName}>Compliance Platform</span>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M17 16L21 12M21 12L17 8M21 12H9M13 16V17C13 18.657 11.657 20 10 20H6C4.343 20 3 18.657 3 17V7C3 5.343 4.343 4 6 4H10C11.657 4 13 5.343 13 7V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Sign out
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {loading && (
          <div className={styles.shell}>
            <div className={styles.card}>
              <div className={styles.skeleton} />
              <div className={styles.skeletonSm} />
            </div>
          </div>
        )}

        {error && !loading && (
          <div className={styles.shell}>
            <div className={styles.card}>
              <p className={styles.errorMsg} role="alert">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className={styles.shell}>
              <div className={styles.card}>
                <div className={styles.welcomeHeader}>
                  <div className={styles.avatarRing}>
                    <div className={styles.avatar}>
                      {username ? username[0].toUpperCase() : 'U'}
                    </div>
                  </div>
                  <div>
                    <h1 className={styles.welcomeTitle}>
                      Welcome back{username ? `, ${username}` : ''}!
                    </h1>
                    <p className={styles.welcomeSub}>
                      You're securely authenticated.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.grid}>
              <div className={styles.metaShell}>
                <div className={styles.metaCard}>
                  <div className={styles.metaIcon} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M12 3L4 7V12C4 16.418 7.582 20 12 21C16.418 20 20 16.418 20 12V7L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className={styles.metaLabel}>Security status</p>
                    <p className={styles.metaValue}>Active session</p>
                  </div>
                </div>
              </div>

              <div className={styles.metaShell}>
                <div className={styles.metaCard}>
                  <div className={styles.metaIcon} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V12L15 15M21 12C21 16.971 16.971 21 12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className={styles.metaLabel}>Token expires in</p>
                    <p className={styles.metaValue}>5 minutes</p>
                  </div>
                </div>
              </div>

              <div className={styles.metaShell}>
                <div className={styles.metaCard}>
                  <div className={styles.metaIcon} aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 7C16 9.209 14.209 11 12 11C9.791 11 8 9.209 8 7C8 4.791 9.791 3 12 3C14.209 3 16 4.791 16 7ZM12 14C7.582 14 4 17.582 4 22H20C20 17.582 16.418 14 12 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className={styles.metaLabel}>Logged in as</p>
                    <p className={styles.metaValue}>{username || '—'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.shell}>
              <div className={styles.card}>
                <p className={styles.apiResponse}>{message}</p>
              </div>
            </div>

            <section className={styles.certSection} aria-labelledby="certificaciones-2026-title">
              <div className={styles.shell}>
                <div className={styles.card}>
                  <h2 id="certificaciones-2026-title" className={styles.certTitle}>
                    Certificaciones Microsoft 2026
                  </h2>
                  <p className={styles.certSub}>
                    Basado en Microsoft Learn (Credential retirement): certificaciones con retiro programado durante 2026.
                  </p>
                </div>
              </div>

              <div className={styles.certGrid}>
                {microsoftCertifications2026.map(certification => (
                  <div key={certification.name} className={styles.metaShell}>
                    <article className={styles.certCard}>
                      <p className={styles.certCategory}>{certification.category}</p>
                      <h3 className={styles.certName}>{certification.name}</h3>
                      <p className={styles.certDate}>Retiro: {certification.retirementDate}</p>
                      <a
                        className={styles.certLink}
                        href={certification.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Ver en Microsoft Learn
                      </a>
                    </article>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}
