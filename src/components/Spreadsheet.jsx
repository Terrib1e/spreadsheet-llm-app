import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';

// Define styles object for inline styling
const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  header: {
    backgroundColor: 'white',
    borderBottom: '1px solid #e5e7eb',
    padding: '0.75rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  headerTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#1f2937'
  },
  errorMessage: {
    backgroundColor: '#fee2e2',
    border: '1px solid #fecaca',
    color: '#b91c1c',
    padding: '0.25rem 0.75rem',
    borderRadius: '0.25rem',
    fontSize: '0.75rem',
    display: 'flex',
    alignItems: 'center'
  },
  flexContainer: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  sidebar: {
    width: '18rem',
    backgroundColor: 'white',
    borderRight: '1px solid #e5e7eb',
    display: 'flex',
    flexDirection: 'column'
  },
  sidebarContent: {
    padding: '1.5rem'
  },
  sidebarHeading: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.25rem'
  },
  sidebarText: {
    fontSize: '0.75rem',
    color: '#6b7280',
    marginBottom: '1rem'
  },
  sidebarSection: {
    marginBottom: '1rem'
  },
  sidebarSectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.5rem'
  },
  sidebarSectionTitle: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#374151'
  },
  sidebarClearButton: {
    fontSize: '0.75rem',
    color: '#2563eb',
    cursor: 'pointer'
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.25rem 0'
  },
  checkbox: {
    height: '1rem',
    width: '1rem',
    color: '#2563eb',
    borderRadius: '0.25rem',
    borderColor: '#d1d5db'
  },
  checkboxLabel: {
    marginLeft: '0.5rem',
    fontSize: '0.875rem',
    color: '#374151'
  },
  inputField: {
    width: '100%',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem'
  },
  sidebarFooter: {
    marginTop: 'auto',
    borderTop: '1px solid #e5e7eb',
    padding: '1rem'
  },
  hideFiltersButton: {
    color: '#6b7280',
    fontSize: '0.875rem',
    cursor: 'pointer'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  toolbar: {
    backgroundColor: 'white',
    borderBottom: '1px solid #e5e7eb',
    padding: '0.5rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  toolbarGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  showFiltersButton: {
    color: '#4b5563',
    fontSize: '0.875rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.25rem',
    padding: '0.375rem 0.5rem',
    cursor: 'pointer'
  },
  inputWithButton: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    overflow: 'hidden'
  },
  inputInGroup: {
    width: '10rem',
    height: '2rem',
    padding: '0.5rem',
    fontSize: '0.875rem',
    border: 'none',
    outline: 'none'
  },
  blueButton: {
    backgroundColor: '#2563eb',
    color: 'white',
    height: '2rem',
    padding: '0 0.75rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer'
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
    cursor: 'not-allowed'
  },
  borderButton: {
    color: '#4b5563',
    fontSize: '0.875rem',
    border: '1px solid #d1d5db',
    borderRadius: '0.25rem',
    padding: '0.375rem 0.75rem',
    cursor: 'pointer'
  },
  rowCount: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  tableContainer: {
    flex: 1,
    overflow: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  tableHeaderRow: {
    backgroundColor: '#f9fafb'
  },
  tableHeaderCell: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
    padding: '0.75rem',
    textAlign: 'left',
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    cursor: 'pointer'
  },
  rowNumberHeader: {
    width: '3.5rem',
    textAlign: 'center',
    zIndex: 20
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sortIcon: {
    marginLeft: '0.25rem',
    color: '#9ca3af'
  },
  deleteButton: {
    color: '#9ca3af',
    cursor: 'pointer',
    marginLeft: '0.5rem',
    opacity: 0,
    outline: 'none'
  },
  rowNumberCell: {
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: '#f9fafb',
    padding: '0.5rem',
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#6b7280',
    textAlign: 'center',
    position: 'sticky',
    left: 0,
    zIndex: 10
  },
  tableCell: {
    borderBottom: '1px solid #e5e7eb',
    padding: 0
  },
  cellActive: {
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    outline: '2px solid #60a5fa'
  },
  cellInput: {
    width: '100%',
    height: '100%',
    padding: '0.5rem',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent'
  },
  deleteRowCell: {
    width: '2.5rem',
    padding: 0,
    borderBottom: '1px solid #e5e7eb',
    position: 'relative'
  },
  deleteRowButton: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9ca3af',
    cursor: 'pointer',
    opacity: 0
  },
  emptyMessage: {
    padding: '3rem 0',
    textAlign: 'center',
    color: '#6b7280',
    borderBottom: '1px solid #e5e7eb'
  },
  llmPanel: {
    borderTop: '1px solid #e5e7eb',
    backgroundColor: 'white'
  },
  llmHeader: {
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
    padding: '0.5rem 1rem',
    display: 'flex',
    alignItems: 'center'
  },
  llmTitle: {
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  llmContent: {
    padding: '1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
    gap: '1rem'
  },
  col3: {
    gridColumn: 'span 3 / span 3'
  },
  col7: {
    gridColumn: 'span 7 / span 7'
  },
  col2: {
    gridColumn: 'span 2 / span 2',
    display: 'flex',
    alignItems: 'flex-end'
  },
  fieldLabel: {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: '0.25rem'
  },
  select: {
    width: '100%',
    border: '1px solid #d1d5db',
    borderRadius: '0.375rem',
    padding: '0.375rem 0.75rem',
    fontSize: '0.875rem'
  },
  deleteIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    cursor: 'pointer',
    fontSize: '14px',
    marginLeft: '4px',
    border: 'none',
    outline: 'none',
  },
  deleteIconHover: {
    backgroundColor: '#fee2e2',
    color: '#ef4444',
  },
  actionColumn: {
    width: '100px',
    textAlign: 'right',
  },
};

const Spreadsheet = () => {
  // Sample initial data
  const initialData = [
    { id: 1, firstName: 'John', lastName: 'Doe', major: 'Computer Science' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', major: 'Biology' },
    { id: 3, firstName: 'Mike', lastName: 'Johnson', major: 'Engineering' },
    { id: 4, firstName: 'Sara', lastName: 'Williams', major: 'Psychology' },
    { id: 5, firstName: 'Alex', lastName: 'Brown', major: 'Business' },
  ];

  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState(['firstName', 'lastName', 'major']);
  const [visibleColumns, setVisibleColumns] = useState(['firstName', 'lastName', 'major']);
  const [newColumnName, setNewColumnName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState('major');
  const [prompt, setPrompt] = useState('Classify if this major makes them an engineer or non-engineer');
  const [apiStatus, setApiStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeCell, setActiveCell] = useState(null);
  const [showFilters, setShowFilters] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const tableRef = useRef(null);

  // Check API health on mount
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const response = await axios.get('http://localhost:5000/health');
        if (response.data.status === 'healthy') {
          setApiStatus('success');
        }
      } catch (error) {
        console.error('API health check failed:', error);
        setApiStatus('error');
        setErrorMessage('Backend API not available. LLM features will not work.');
      }
    };

    checkApiHealth();
  }, []);

  const handleCellChange = (rowId, column, value) => {
    setData(data.map(row =>
      row.id === rowId ? { ...row, [column]: value } : row
    ));
  };

  const addRow = () => {
    const newRow = {
      id: Math.max(...data.map(row => row.id), 0) + 1
    };
    columns.forEach(col => {
      newRow[col] = '';
    });
    setData([...data, newRow]);
  };

  const deleteRow = (rowId) => {
    setData(data.filter(row => row.id !== rowId));
  };

  const toggleColumnVisibility = (column) => {
    if (visibleColumns.includes(column)) {
      // Don't allow hiding all columns
      if (visibleColumns.length > 1) {
        setVisibleColumns(visibleColumns.filter(col => col !== column));
      }
    } else {
      setVisibleColumns([...visibleColumns, column]);
    }
  };

  const resetColumnVisibility = () => {
    setVisibleColumns([...columns]);
  };

  // Ensure selectedColumn is visible or select first visible column
  useEffect(() => {
    if (!visibleColumns.includes(selectedColumn) && visibleColumns.length > 0) {
      setSelectedColumn(visibleColumns[0]);
    }
  }, [visibleColumns, selectedColumn]);

  const addColumn = () => {
    if (newColumnName && !columns.includes(newColumnName)) {
      const newColumns = [...columns, newColumnName];
      setColumns(newColumns);
      setVisibleColumns([...visibleColumns, newColumnName]); // Make new column visible by default
      setData(data.map(row => ({
        ...row,
        [newColumnName]: ''
      })));
      setNewColumnName('');
    }
  };

  const deleteColumn = (column) => {
    if (columns.length > 1) {
      const newColumns = columns.filter(col => col !== column);
      setColumns(newColumns);
      setVisibleColumns(visibleColumns.filter(col => col !== column)); // Remove from visible columns too

      // Remove the column from each row
      setData(data.map(row => {
        const newRow = { ...row };
        delete newRow[column];
        return newRow;
      }));
    }
  };

  const generateColumnWithLLM = async () => {
    setIsGenerating(true);
    try {
      const response = await axios.post('http://localhost:5000/generate-column', {
        columnData: data.map(row => row[selectedColumn]),
        prompt
      });

      // Create a descriptive name for the new column based on the selected column and prompt
      const promptWords = prompt.split(' ').slice(0, 3).join('_');
      const newColumnName = `${selectedColumn}_${promptWords}`.substring(0, 25);

      if (response.data && response.data.results) {
        // Add new column if it doesn't exist
        if (!columns.includes(newColumnName)) {
          setColumns(prevColumns => [...prevColumns, newColumnName]);
          setVisibleColumns(prevVisible => [...prevVisible, newColumnName]);
        }

        // Update data with generated values
        setData(data.map((row, index) => ({
          ...row,
          [newColumnName]: response.data.results[index] || ''
        })));

        // Show success message
        setApiStatus('success');
        setTimeout(() => setApiStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error generating column:', error);
      setErrorMessage('Failed to generate column. Check if backend is running.');
      setApiStatus('error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCellFocus = (rowId, column) => {
    setActiveCell({ rowId, column });
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Filter data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;

    return data.filter(row => {
      return columns.some(column => {
        const value = String(row[column] || '').toLowerCase();
        return value.includes(searchTerm.toLowerCase());
      });
    });
  }, [data, columns, searchTerm]);

  // Sort the filtered data
  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const getSortDirectionIcon = (column) => {
    if (sortConfig.key !== column) return '↕';
    return sortConfig.direction === 'ascending' ? '↑' : '↓';
  };

  return (
    <div style={styles.container}>
      {/* Top navigation bar */}
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

      <div style={styles.flexContainer}>
        {/* Left sidebar - Clay style */}
        {showFilters && (
          <div style={styles.sidebar}>
            <div style={styles.sidebarContent}>
              <h2 style={styles.sidebarHeading}>Filters</h2>
              <p style={styles.sidebarText}>Apply filters to refine your data</p>

              {/* Filter sections - Clay style */}
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
        )}

        {/* Main content */}
        <div style={styles.mainContent}>
          {/* Toolbar - Clay style */}
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
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (window.confirm('Delete all rows? This cannot be undone.')) {
                      setData([]);
                    }
                  }}
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

          {/* Clay Style Table */}
          <div style={styles.tableContainer}>
            <table ref={tableRef} style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={{ ...styles.tableHeaderCell, ...styles.rowNumberHeader }}>
                    #
                  </th>
                  {visibleColumns.map((column) => (
                    <th
                      key={column}
                      style={styles.tableHeaderCell}
                      onClick={() => requestSort(column)}
                    >
                      <div style={styles.headerContent}>
                        <span>{column}</span>
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={styles.sortIcon}>{getSortDirectionIcon(column)}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              if (window.confirm(`Delete column "${column}"?`)) {
                                deleteColumn(column);
                              }
                            }}
                            style={styles.deleteIcon}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#fee2e2';
                              e.currentTarget.style.color = '#ef4444';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#f3f4f6';
                              e.currentTarget.style.color = '#6b7280';
                            }}
                            title="Delete column"
                            type="button"
                          >
                            ✕
                          </button>
                        </span>
                      </div>
                    </th>
                  ))}
                  <th style={{ ...styles.tableHeaderCell, width: '100px' }}></th>
                </tr>
              </thead>
              <tbody>
                {sortedData.length > 0 ? (
                  sortedData.map((row, rowIdx) => (
                    <tr key={row.id} style={{ ':hover': { backgroundColor: 'rgba(59, 130, 246, 0.1)' } }}>
                      <td style={styles.rowNumberCell}>
                        {rowIdx + 1}
                      </td>
                      {visibleColumns.map(column => (
                        <td
                          key={`${row.id}-${column}`}
                          style={
                            activeCell?.rowId === row.id && activeCell?.column === column
                              ? { ...styles.tableCell, ...styles.cellActive }
                              : styles.tableCell
                          }
                        >
                          <input
                            type="text"
                            value={row[column] || ''}
                            onChange={(e) => handleCellChange(row.id, column, e.target.value)}
                            onFocus={() => handleCellFocus(row.id, column)}
                            style={styles.cellInput}
                            placeholder=""
                          />
                        </td>
                      ))}
                      <td style={{...styles.tableCell, ...styles.actionColumn}}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (window.confirm('Delete this row?')) {
                              deleteRow(row.id);
                            }
                          }}
                          style={{
                            padding: '2px 8px',
                            color: '#6b7280',
                            backgroundColor: '#f3f4f6',
                            border: '1px solid #d1d5db',
                            borderRadius: '4px',
                            fontSize: '12px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center'
                          }}
                          title="Delete row"
                          type="button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={visibleColumns.length + 2} style={styles.emptyMessage}>
                      <p>No data available. Add a row to get started.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* LLM Generator Panel - Clay style */}
          <div style={styles.llmPanel}>
            <div style={styles.llmHeader}>
              <h3 style={styles.llmTitle}>Generate New Column from Data</h3>
            </div>
            <div style={styles.llmContent}>
              <div style={styles.col3}>
                <label htmlFor="sourceColumn" style={styles.fieldLabel}>
                  Source Column
                </label>
                <select
                  id="sourceColumn"
                  value={selectedColumn}
                  onChange={(e) => setSelectedColumn(e.target.value)}
                  style={styles.select}
                >
                  {visibleColumns.map(col => (
                    <option key={col} value={col}>{col}</option>
                  ))}
                </select>
              </div>

              <div style={styles.col7}>
                <label htmlFor="prompt" style={styles.fieldLabel}>
                  Prompt
                </label>
                <input
                  id="prompt"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  style={styles.inputField}
                  placeholder="Describe what you want to generate..."
                />
              </div>

              <div style={styles.col2}>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    generateColumnWithLLM();
                  }}
                  disabled={isGenerating}
                  style={isGenerating ? { ...styles.blueButton, ...styles.disabledButton, width: '100%' } : { ...styles.blueButton, width: '100%' }}
                  type="button"
                >
                  {isGenerating ? 'Generating...' : 'Generate New Column'}
                </button>
              </div>
            </div>
          </div>

          {/* Success message */}
          {apiStatus === 'success' && (
            <div style={{
              backgroundColor: '#ecfdf5',
              border: '1px solid #10b981',
              color: '#047857',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              zIndex: 50,
            }}>
              Column generated successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Spreadsheet;