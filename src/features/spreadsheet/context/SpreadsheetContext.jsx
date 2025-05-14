import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { initialData, initialColumns } from '../utils/initialData';
import { filterData, sortData } from '../utils/utils';
import { checkApiHealth, generateColumn } from '../services/api';

// Create context
const SpreadsheetContext = createContext();

// Custom hook to use the spreadsheet context
export const useSpreadsheet = () => useContext(SpreadsheetContext);

// Provider component
export const SpreadsheetProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState(initialColumns);
  const [visibleColumns, setVisibleColumns] = useState(initialColumns);
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

  // Check API health on mount
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await checkApiHealth();
        if (response.data.status === 'healthy') {
          setApiStatus('success');
        }
      } catch (error) {
        console.error('API health check failed:', error);
        setApiStatus('error');
        setErrorMessage('Backend API not available. LLM features will not work.');
      }
    };

    checkHealth();
  }, []);

  // Handle data operations
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

  const clearAllRows = () => {
    if (window.confirm('Delete all rows? This cannot be undone.')) {
      setData([]);
    }
  };

  // Column operations
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

  // LLM operations
  const generateColumnWithLLM = async () => {
    setIsGenerating(true);
    try {
      // Filter out rows with empty values in the selected column
      const nonEmptyRows = data.filter(row => row[selectedColumn]?.trim());
      const nonEmptyValues = nonEmptyRows.map(row => row[selectedColumn]);

      if (nonEmptyValues.length === 0) {
        setErrorMessage('No non-empty values found in the selected column to classify.');
        setApiStatus('error');
        setTimeout(() => setApiStatus('idle'), 3000);
        return;
      }

      const response = await generateColumn(
        nonEmptyValues,
        prompt
      );

      // Use a consistent column name "Major Classification"
      const fixedColumnName = "Major Classification";

      if (response.data && response.data.results) {
        // Add the column if it doesn't exist
        if (!columns.includes(fixedColumnName)) {
          setColumns(prevColumns => [...prevColumns, fixedColumnName]);
          setVisibleColumns(prevVisible => [...prevVisible, fixedColumnName]);
        }

        // Create a map of row IDs to classification results
        const rowClassifications = {};
        nonEmptyRows.forEach((row, index) => {
          rowClassifications[row.id] = response.data.results[index] || '';
        });

        // Update data, preserving existing values for rows that weren't classified
        setData(data.map(row => {
          if (Object.prototype.hasOwnProperty.call(rowClassifications, row.id)) {
            return {
              ...row,
              [fixedColumnName]: rowClassifications[row.id]
            };
          }
          // Keep the existing classification value for blank rows
          return row;
        }));

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

  // UI operations
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

  // Filtered and sorted data
  const filteredData = useMemo(() =>
    filterData(data, columns, searchTerm),
    [data, columns, searchTerm]
  );

  const sortedData = useMemo(() =>
    sortData(filteredData, sortConfig),
    [filteredData, sortConfig]
  );

  // Ensure selectedColumn is visible or select first visible column
  useEffect(() => {
    if (!visibleColumns.includes(selectedColumn) && visibleColumns.length > 0) {
      setSelectedColumn(visibleColumns[0]);
    }
  }, [visibleColumns, selectedColumn]);

  // Context value
  const value = {
    data,
    columns,
    visibleColumns,
    newColumnName,
    isGenerating,
    selectedColumn,
    prompt,
    apiStatus,
    errorMessage,
    activeCell,
    showFilters,
    sortConfig,
    searchTerm,
    sortedData,
    filteredData,
    setNewColumnName,
    setSelectedColumn,
    setPrompt,
    setSearchTerm,
    setShowFilters,
    handleCellChange,
    addRow,
    deleteRow,
    clearAllRows,
    toggleColumnVisibility,
    resetColumnVisibility,
    addColumn,
    deleteColumn,
    generateColumnWithLLM,
    handleCellFocus,
    requestSort
  };

  return (
    <SpreadsheetContext.Provider value={value}>
      {children}
    </SpreadsheetContext.Provider>
  );
};

export default SpreadsheetContext;