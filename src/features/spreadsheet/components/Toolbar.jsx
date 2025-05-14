import React from 'react';
import { useSpreadsheet } from '../context/SpreadsheetContext';
import styles from '../utils/styles';

const Toolbar = () => {
  const {
    newColumnName,
    setNewColumnName,
    addColumn,
    addRow,
    clearAllRows,
    showFilters,
    setShowFilters,
    sortedData,
    data,
    searchTerm
  } = useSpreadsheet();

  return (
    <div style={styles.toolbar}>
      <div style={styles.toolbarGroup}>
        {!showFilters && (
          <button
            onClick={() => setShowFilters(true)}
            style={styles.showFiltersButton}
          >
            Filters
          </button>
        )}

        <div style={styles.inputWithButton}>
          <input
            type="text"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
            style={styles.inputInGroup}
            placeholder="New column name"
          />
          <button
            onClick={addColumn}
            disabled={!newColumnName.trim()}
            style={!newColumnName.trim() ? { ...styles.blueButton, ...styles.disabledButton } : styles.blueButton}
          >
            Add
          </button>
        </div>

        <button
          onClick={addRow}
          style={styles.borderButton}
        >
          Add Row
        </button>

        {data.length > 0 && (
          <button
            onClick={clearAllRows}
            style={{...styles.borderButton, color: '#ef4444'}}
            type="button"
          >
            Clear All
          </button>
        )}
      </div>

      <div>
        <span style={styles.rowCount}>
          {sortedData.length} {sortedData.length === 1 ? 'row' : 'rows'}
          {searchTerm && ` (filtered from ${data.length})`}
        </span>
      </div>
    </div>
  );
};

export default Toolbar;