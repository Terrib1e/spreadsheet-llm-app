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
  const cellRefs = useRef({});

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

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeaderRow}>
            <th style={{ ...styles.tableHeaderCell, ...styles.rowNumberHeader }}>#</th>
            {visibleColumns.map((column) => (
              <th
                key={column}
                style={styles.tableHeaderCell}
                onMouseEnter={() => setHoverColumn(column)}
                onMouseLeave={() => setHoverColumn(null)}
              >
                <div style={styles.headerContent}>
                  <span onClick={() => requestSort(column)} style={{ cursor: 'pointer' }}>
                    {column}
                    <span style={styles.sortIcon}>
                      {getSortDirectionIcon(column, sortConfig)}
                    </span>
                  </span>
                  <button
                    onClick={() => handleDeleteColumn(column)}
                    style={{
                      ...styles.deleteButton,
                      opacity: hoverColumn === column ? 1 : 0
                    }}
                    title="Delete column"
                  >
                    ×
                  </button>
                </div>
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
                No data available. Add a row to get started.
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr
                key={row.id}
                onMouseEnter={() => setHoverRow(row.id)}
                onMouseLeave={() => setHoverRow(null)}
              >
                <td style={styles.rowNumberCell}>{rowIndex + 1}</td>
                {visibleColumns.map((column) => (
                  <td
                    key={`${row.id}-${column}`}
                    style={{
                      ...styles.tableCell,
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
                    ×
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