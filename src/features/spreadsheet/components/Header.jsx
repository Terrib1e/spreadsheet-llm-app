import React from 'react';
import { useSpreadsheet } from '../context/SpreadsheetContext';
import styles from '../utils/styles';

const Header = () => {
  const { apiStatus, errorMessage } = useSpreadsheet();

  return (
    <div style={styles.header}>
      <h1 style={styles.headerTitle}>Spreadsheet LLM</h1>
      <div>
        {apiStatus === 'error' && (
          <div style={styles.errorMessage}>
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;