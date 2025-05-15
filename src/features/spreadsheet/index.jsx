import React from 'react';
import { SpreadsheetProvider, useSpreadsheet } from './context/SpreadsheetContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import Table from './components/Table';
import LLMPanel from './components/LLMPanel';
import styles from './utils/styles';

const SpreadsheetContent = () => {
  const { showFilters } = useSpreadsheet();

  return (
    <div style={styles.container}>
      <Header />
      <div style={styles.flexContainer}>
        {showFilters && <Sidebar />}
        <div style={styles.mainContent}>
          <Toolbar />
          <Table />
          <LLMPanel />
        </div>
      </div>
    </div>
  );
};

const SpreadsheetApp = () => {
  return (
    <SpreadsheetProvider>
      <SpreadsheetContent />
    </SpreadsheetProvider>
  );
};

export default SpreadsheetApp;