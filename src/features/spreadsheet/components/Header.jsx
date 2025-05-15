import React from 'react';
import { useSpreadsheet } from '../context/SpreadsheetContext';
import styles from '../utils/styles';

const Header = () => {
  const { apiStatus, errorMessage } = useSpreadsheet();

  return (
    <div style={styles.header}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{
          width: '2rem',
          height: '2rem',
          backgroundColor: '#4F46E5',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '700',
          fontSize: '1.25rem'
        }}>
          S
        </div>
        <h1 style={styles.headerTitle}>CharacterQuilt Data</h1>
      </div>
      <div>
        {apiStatus === 'error' && (
          <div style={styles.errorMessage}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }}>
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errorMessage}
          </div>
        )}
        {apiStatus === 'success' && (
          <div style={{ ...styles.badge, ...styles.badgeGreen }}>
            API Connected
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;