import React from 'react';
import { useSpreadsheet } from '../context/SpreadsheetContext';
import styles from '../utils/styles';

const Sidebar = () => {
  const {
    columns,
    visibleColumns,
    toggleColumnVisibility,
    resetColumnVisibility,
    searchTerm,
    setSearchTerm,
    setShowFilters,
    filteredData,
    data
  } = useSpreadsheet();

  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebarContent}>
        <h2 style={styles.sidebarHeading}>Filters</h2>
        <p style={styles.sidebarText}>Apply filters to refine your data</p>

        {/* Filter sections */}
        <div style={styles.sidebarSection}>
          <div style={styles.sidebarSectionHeader}>
            <h3 style={styles.sidebarSectionTitle}>Columns to include</h3>
            <button
              onClick={resetColumnVisibility}
              style={styles.sidebarClearButton}
            >
              Show All
            </button>
          </div>
          <div style={{ maxHeight: '10rem', overflowY: 'auto' }}>
            {columns.map(column => (
              <div key={column} style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id={`col-${column}`}
                  checked={visibleColumns.includes(column)}
                  onChange={() => toggleColumnVisibility(column)}
                  style={styles.checkbox}
                />
                <label htmlFor={`col-${column}`} style={styles.checkboxLabel}>
                  {column}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...styles.sidebarSection, paddingTop: '1rem', marginTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <div style={styles.sidebarSectionHeader}>
            <h3 style={styles.sidebarSectionTitle}>Keywords</h3>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={styles.sidebarClearButton}
              >
                Clear
              </button>
            )}
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <input
              type="text"
              placeholder="Filter by keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.inputField}
            />
          </div>
          {searchTerm && (
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              Found {filteredData.length} of {data.length} rows
            </div>
          )}
        </div>
      </div>

      <div style={styles.sidebarFooter}>
        <button
          onClick={() => setShowFilters(false)}
          style={styles.hideFiltersButton}
        >
          ← Hide Filters
        </button>
      </div>
    </div>
  );
};

export default Sidebar;