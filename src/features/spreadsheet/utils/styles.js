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
  successMessage: {
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
  }
};

export default styles;