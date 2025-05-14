/**
 * Sort data based on the provided configuration.
 *
 * @param {Array} data - The data to sort
 * @param {Object} sortConfig - The sort configuration {key, direction}
 * @returns {Array} - Sorted data
 */
export const sortData = (data, sortConfig) => {
  if (!sortConfig.key) return data;

  return [...data].sort((a, b) => {
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
};

/**
 * Filter data based on the search term.
 *
 * @param {Array} data - The data to filter
 * @param {Array} columns - The columns to search in
 * @param {string} searchTerm - The search term
 * @returns {Array} - Filtered data
 */
export const filterData = (data, columns, searchTerm) => {
  if (!searchTerm.trim()) return data;

  return data.filter(row => {
    return columns.some(column => {
      const value = String(row[column] || '').toLowerCase();
      return value.includes(searchTerm.toLowerCase());
    });
  });
};

/**
 * Get the sort direction icon.
 *
 * @param {string} column - The column name
 * @param {Object} sortConfig - The sort configuration {key, direction}
 * @returns {string} - The icon to display
 */
export const getSortDirectionIcon = (column, sortConfig) => {
  if (sortConfig.key !== column) return '↕';
  return sortConfig.direction === 'ascending' ? '↑' : '↓';
};