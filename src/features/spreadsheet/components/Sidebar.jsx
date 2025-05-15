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
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.25rem 1.5rem 0.5rem 1.5rem',
        borderBottom: '1px solid #ECEEF0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1.25rem', height: '1.25rem', color: '#4F46E5' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h2 style={styles.sidebarHeading}>Filters</h2>
        </div>
        <button
          onClick={() => setShowFilters(false)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: '#6B7280',
            transition: 'background-color 0.15s ease-in-out'
          }}
          title="Hide filters"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1.25rem', height: '1.25rem' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div style={styles.sidebarContent}>
        <p style={styles.sidebarText}>Apply filters to refine your data view</p>

        {/* Search section */}
        <div style={{ ...styles.sidebarSection, marginBottom: '1.5rem' }}>
          <div style={styles.sidebarSectionHeader}>
            <h3 style={styles.sidebarSectionTitle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '0.875rem', height: '0.875rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Keywords
              </div>
            </h3>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={styles.sidebarClearButton}
              >
                Clear
              </button>
            )}
          </div>
          <div style={{ marginBottom: '0.75rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '0.625rem', left: '0.75rem', pointerEvents: 'none' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '0.875rem', height: '0.875rem', color: '#9CA3AF' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Filter by keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ ...styles.inputField, paddingLeft: '2rem' }}
            />
          </div>
          {searchTerm && (
            <div style={{ fontSize: '0.875rem', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <div style={{ ...styles.badge, ...styles.badgeBlue, padding: '0.125rem 0.5rem' }}>
                {filteredData.length} of {data.length} rows
              </div>
            </div>
          )}
        </div>

        {/* Column visibility section */}
        <div style={styles.sidebarSection}>
          <div style={styles.sidebarSectionHeader}>
            <h3 style={styles.sidebarSectionTitle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '0.875rem', height: '0.875rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
                Columns to include
              </div>
            </h3>
            <button
              onClick={resetColumnVisibility}
              style={styles.sidebarClearButton}
            >
              Show All
            </button>
          </div>
          <div style={{ maxHeight: '12rem', overflowY: 'auto', padding: '0.25rem' }}>
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
      </div>
    </div>
  );
};

export default Sidebar;