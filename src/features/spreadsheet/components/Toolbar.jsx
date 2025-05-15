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
    searchTerm,
    setSearchTerm
  } = useSpreadsheet();

  return (
    <div style={styles.toolbar}>
      <div style={styles.toolbarGroup}>
        {!showFilters && (
          <button
            onClick={() => setShowFilters(true)}
            style={styles.showFiltersButton}
            title="Show filters"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1rem', height: '1rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
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
            title="Add a new column"
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1rem', height: '1rem' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Column
            </span>
          </button>
        </div>

        <div style={styles.inputWithButton}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '0.625rem', left: '0.75rem', pointerEvents: 'none' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '0.875rem', height: '0.875rem', color: '#9CA3AF' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ ...styles.inputInGroup, paddingLeft: '2rem' }}
              placeholder="Search data..."
            />
          </div>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{ ...styles.blueButton, backgroundColor: 'transparent', color: '#6B7280' }}
              title="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1rem', height: '1rem' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <button
          onClick={addRow}
          style={{
            ...styles.borderButton,
            display: 'flex',
            alignItems: 'center',
            gap: '0.375rem'
          }}
          title="Add a new row"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1rem', height: '1rem' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Row
        </button>

        {data.length > 0 && (
          <button
            onClick={clearAllRows}
            style={{
              ...styles.borderButton,
              color: '#EF4444',
              borderColor: '#FCA5A5',
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem'
            }}
            type="button"
            title="Delete all rows"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1rem', height: '1rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear All
          </button>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ ...styles.badge, ...styles.badgeBlue }}>
          {sortedData.length} {sortedData.length === 1 ? 'row' : 'rows'}
          {searchTerm && ` (filtered from ${data.length})`}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;