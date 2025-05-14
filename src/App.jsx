import './App.css'
import Spreadsheet from './components/Spreadsheet'

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9fafb'
  },
  header: {
    backgroundColor: 'white',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  },
  headerContent: {
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '1rem 1rem',
  },
  headerTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#111827'
  },
  main: {
    flex: '1',
    overflow: 'hidden'
  },
  mainContent: {
    height: '100%',
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '0 1.5rem'
  },
  footer: {
    backgroundColor: 'white',
    borderTop: '1px solid #e5e7eb'
  },
  footerContent: {
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '0.75rem 1rem',
  },
  footerText: {
    fontSize: '0.875rem',
    color: '#6b7280',
    textAlign: 'center'
  }
};

function App() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>CharacterQuilt Smart Spreadsheet</h1>
        </div>
      </header>
      <main style={styles.main}>
        <div style={styles.mainContent}>
          <Spreadsheet />
        </div>
      </main>
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <p style={styles.footerText}>
            Built for CharacterQuilt Interview Assessment • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
