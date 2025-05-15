import React, { useRef, useEffect, useState } from 'react';
import { useSpreadsheet } from '../context/SpreadsheetContext';
import styles from '../utils/styles';
import { getSortDirectionIcon } from '../utils/utils';

const Table = () => {
  const {
    sortedData,
    visibleColumns,
    activeCell,
    handleCellFocus,
    handleCellChange,
    requestSort,
    sortConfig,
    deleteRow,
    deleteColumn,
    addRow
  } = useSpreadsheet();

  const [hoverColumn, setHoverColumn] = useState(null);
  const [hoverRow, setHoverRow] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const [resizingColumn, setResizingColumn] = useState(null);
  const [startX, setStartX] = useState(null);
  const [startWidth, setStartWidth] = useState(null);

  const cellRefs = useRef({});
  const tableRef = useRef(null);
  const columnRefs = useRef({});

  useEffect(() => {
    if (activeCell && cellRefs.current[`${activeCell.rowId}-${activeCell.column}`]) {
      cellRefs.current[`${activeCell.rowId}-${activeCell.column}`].focus();
    }
  }, [activeCell]);

  const handleKeyDown = (e, rowIndex, column) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      // If this is the last row, add a new row
      if (rowIndex === sortedData.length - 1) {
        addRow();

        // Focus will be handled in the next render cycle via the effect
        setTimeout(() => {
          const newRowId = Math.max(...sortedData.map(row => row.id), 0) + 1;
          handleCellFocus(newRowId, column);
        }, 0);
      } else {
        // Otherwise, move to the next row, same column
        const nextRowId = sortedData[rowIndex + 1].id;
        handleCellFocus(nextRowId, column);
      }
    }
  };

  const handleDeleteColumn = (column) => {
    if (window.confirm(`Are you sure you want to delete the column "${column}"?`)) {
      deleteColumn(column);
    }
  };

  const handleDeleteRow = (rowId) => {
    if (window.confirm('Are you sure you want to delete this row?')) {
      deleteRow(rowId);
    }
  };

  const handleResizeStart = (e, column) => {
    e.preventDefault();
    setResizingColumn(column);
    setStartX(e.clientX);
    setStartWidth(columnRefs.current[column].offsetWidth);

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  const handleResizeMove = (e) => {
    if (resizingColumn && startX !== null) {
      const width = Math.max(100, startWidth + (e.clientX - startX));
      setColumnWidths({
        ...columnWidths,
        [resizingColumn]: width
      });
    }
  };

  const handleResizeEnd = () => {
    setResizingColumn(null);
    setStartX(null);
    setStartWidth(null);

    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, []);

  return (
    <div style={styles.tableContainer} ref={tableRef}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeaderRow}>
            <th style={{ ...styles.tableHeaderCell, ...styles.rowNumberHeader }}>#</th>
            {visibleColumns.map((column) => (
              <th
                key={column}
                style={{
                  ...styles.tableHeaderCell,
                  width: columnWidths[column] ? `${columnWidths[column]}px` : 'auto',
                  position: 'relative'
                }}
                ref={(el) => columnRefs.current[column] = el}
                onMouseEnter={() => setHoverColumn(column)}
                onMouseLeave={() => setHoverColumn(null)}
              >
                <div style={styles.headerContent}>
                  <div
                    onClick={() => requestSort(column)}
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    {column.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    <span style={styles.sortIcon}>
                      {getSortDirectionIcon(column, sortConfig) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          style={{
                            width: '0.875rem',
                            height: '0.875rem',
                            transform: sortConfig.key === column && sortConfig.direction === 'descending'
                              ? 'rotate(180deg)'
                              : 'none',
                            transition: 'transform 0.2s'
                          }}
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDeleteColumn(column)}
                    style={{
                      ...styles.deleteButton,
                      opacity: hoverColumn === column ? 1 : 0
                    }}
                    title="Delete column"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style={{ width: '0.875rem', height: '0.875rem' }}>
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div
                  style={{
                    ...styles.resizeHandle,
                    ...(hoverColumn === column ? styles.resizeHandleVisible : {})
                  }}
                  onMouseDown={(e) => handleResizeStart(e, column)}
                />
              </th>
            ))}
            <th style={styles.tableHeaderCell}></th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={visibleColumns.length + 2}
                style={styles.emptyMessage}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '2.5rem', height: '2.5rem', color: '#9CA3AF' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p style={{ marginBottom: '0.5rem', fontWeight: '500' }}>No data available</p>
                    <p style={{ fontSize: '0.875rem' }}>Add a row to get started</p>
                  </div>
                  <button
                    onClick={addRow}
                    style={{
                      ...styles.blueButton,
                      borderRadius: '0.375rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      padding: '0 1rem'
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1rem', height: '1rem' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Row
                  </button>
                </div>
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr
                key={row.id}
                onMouseEnter={() => setHoverRow(row.id)}
                onMouseLeave={() => setHoverRow(null)}
                style={{
                  backgroundColor: rowIndex % 2 === 0 ? 'white' : '#F9FAFB',
                  ...(hoverRow === row.id ? styles.tableRowHover : {})
                }}
              >
                <td style={styles.rowNumberCell}>{rowIndex + 1}</td>
                {visibleColumns.map((column) => (
                  <td
                    key={`${row.id}-${column}`}
                    style={{
                      ...styles.tableCell,
                      width: columnWidths[column] ? `${columnWidths[column]}px` : 'auto',
                      ...(activeCell?.rowId === row.id && activeCell?.column === column
                        ? styles.cellActive
                        : {})
                    }}
                  >
                    <input
                      ref={(el) => cellRefs.current[`${row.id}-${column}`] = el}
                      type="text"
                      value={row[column] || ''}
                      onChange={(e) => handleCellChange(row.id, column, e.target.value)}
                      onFocus={() => handleCellFocus(row.id, column)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, column)}
                      style={styles.cellInput}
                      placeholder="Empty"
                    />
                  </td>
                ))}
                <td style={styles.deleteRowCell}>
                  <button
                    onClick={() => handleDeleteRow(row.id)}
                    style={{
                      ...styles.deleteRowButton,
                      opacity: hoverRow === row.id ? 1 : 0
                    }}
                    title="Delete row"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1rem', height: '1rem' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;