// Define styles object for inline styling
const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    overflow: 'hidden'
  },
  header: {
    backgroundColor: 'white',
    borderBottom: '1px solid #ECEEF0',
    padding: '1rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 30
  },
  headerTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#111827',
    letterSpacing: '-0.025em'
  },
  errorMessage: {
    backgroundColor: '#FEF2F2',
    border: '1px solid #FECACA',
    color: '#B91C1C',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
  },
  flexContainer: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden'
  },
  sidebar: {
    width: '20rem',
    backgroundColor: 'white',
    borderRight: '1px solid #ECEEF0',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '1px 0 3px rgba(0, 0, 0, 0.05)',
    position: 'sticky',
    top: 0,
    maxHeight: '100vh',
    zIndex: 20,
    overflow: 'hidden'
  },
  sidebarContent: {
    padding: '1.5rem',
    overflowY: 'auto',
    flexGrow: 1,
    maxHeight: 'calc(100vh - 4rem)'
  },
  sidebarHeading: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#4B5563',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.5rem'
  },
  sidebarText: {
    fontSize: '0.875rem',
    color: '#6B7280',
    marginBottom: '1rem',
    lineHeight: '1.5'
  },
  sidebarSection: {
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#F9FAFB',
    borderRadius: '0.5rem'
  },
  sidebarSectionHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '0.75rem'
  },
  sidebarSectionTitle: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151'
  },
  sidebarClearButton: {
    fontSize: '0.75rem',
    color: '#4F46E5',
    cursor: 'pointer',
    fontWeight: '500'
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 0'
  },
  checkbox: {
    height: '1rem',
    width: '1rem',
    color: '#4F46E5',
    borderRadius: '0.25rem',
    borderColor: '#D1D5DB'
  },
  checkboxLabel: {
    marginLeft: '0.5rem',
    fontSize: '0.875rem',
    color: '#374151'
  },
  inputField: {
    width: '100%',
    border: '1px solid #D1D5DB',
    borderRadius: '0.5rem',
    padding: '0.625rem 0.75rem',
    fontSize: '0.875rem',
    backgroundColor: 'white',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    height: '2.25rem'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: 'white'
  },
  toolbar: {
    backgroundColor: 'white',
    borderBottom: '1px solid #ECEEF0',
    padding: '0.75rem 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 20
  },
  toolbarGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  showFiltersButton: {
    color: '#4B5563',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: '1px solid #D1D5DB',
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    transition: 'background-color 0.15s ease-in-out',
    height: '2.25rem'
  },
  inputWithButton: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #D1D5DB',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
  },
  inputInGroup: {
    width: '12rem',
    height: '2.25rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    border: 'none',
    outline: 'none',
    backgroundColor: 'white'
  },
  blueButton: {
    backgroundColor: '#4F46E5',
    color: 'white',
    height: '2.25rem',
    padding: '0 0.75rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    transition: 'background-color 0.15s ease-in-out',
    borderRadius: '0.5rem'
  },
  disabledButton: {
    backgroundColor: '#E5E7EB',
    cursor: 'not-allowed',
    opacity: 0.7
  },
  borderButton: {
    color: '#4B5563',
    fontSize: '0.875rem',
    fontWeight: '500',
    border: '1px solid #D1D5DB',
    borderRadius: '0.5rem',
    padding: '0.5rem 0.75rem',
    cursor: 'pointer',
    backgroundColor: 'white',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    transition: 'background-color 0.15s ease-in-out, border-color 0.15s ease-in-out',
    height: '2.25rem'
  },
  rowCount: {
    fontSize: '0.875rem',
    color: '#6B7280',
    fontWeight: '500'
  },
  tableContainer: {
    flex: 1,
    overflow: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  tableHeaderRow: {
    backgroundColor: '#F3F4F6'
  },
  tableHeaderCell: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#F3F4F6',
    borderBottom: '1px solid #E5E7EB',
    padding: '0.75rem 0.75rem',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#4B5563',
    textTransform: 'capitalize',
    letterSpacing: '0.025em',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.15s ease-in-out',
    zIndex: 5
  },
  rowNumberHeader: {
    width: '3.5rem',
    textAlign: 'center',
    zIndex: 20,
    position: 'sticky',
    left: 0
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  sortIcon: {
    marginLeft: '0.25rem',
    color: '#9CA3AF'
  },
  deleteButton: {
    color: '#9CA3AF',
    cursor: 'pointer',
    marginLeft: '0.5rem',
    opacity: 0,
    outline: 'none',
    width: '1.5rem',
    height: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background-color 0.15s ease-in-out, opacity 0.15s ease-in-out'
  },
  rowNumberCell: {
    borderBottom: '1px solid #E5E7EB',
    backgroundColor: '#F9FAFB',
    padding: '0.625rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
    position: 'sticky',
    left: 0,
    zIndex: 10
  },
  tableCell: {
    borderBottom: '1px solid #E5E7EB',
    padding: 0,
    transition: 'background-color 0.15s ease-in-out',
    height: '2.5rem'
  },
  cellActive: {
    backgroundColor: 'rgba(79, 70, 229, 0.05)',
    outline: '2px solid #6366F1',
    boxShadow: '0 0 0 1px rgba(99, 102, 241, 0.1)'
  },
  cellInput: {
    width: '100%',
    height: '100%',
    padding: '0.75rem 0.75rem',
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    display: 'flex',
    alignItems: 'center'
  },
  deleteRowCell: {
    width: '2.5rem',
    padding: 0,
    borderBottom: '1px solid #E5E7EB',
    position: 'relative'
  },
  deleteRowButton: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9CA3AF',
    cursor: 'pointer',
    opacity: 0,
    transition: 'opacity 0.15s ease-in-out'
  },
  emptyMessage: {
    padding: '3rem 0',
    textAlign: 'center',
    color: '#6B7280',
    borderBottom: '1px solid #E5E7EB',
    backgroundColor: '#F9FAFB',
    borderRadius: '0.5rem',
    margin: '1rem'
  },
  llmPanel: {
    borderTop: '1px solid #ECEEF0',
    backgroundColor: 'white',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    borderRadius: '0.5rem',
    margin: '0.5rem',
    position: 'relative',
    zIndex: 15
  },
  llmHeader: {
    backgroundColor: '#F3F4F6',
    borderBottom: '1px solid #E5E7EB',
    padding: '0.75rem 1.25rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '0.5rem 0.5rem 0 0'
  },
  llmTitle: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#4B5563',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  llmContent: {
    padding: '1.5rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
    gap: '1.5rem'
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
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: '0.375rem'
  },
  select: {
    width: '100%',
    border: '1px solid #D1D5DB',
    borderRadius: '0.5rem',
    padding: '0.625rem 0.75rem',
    fontSize: '0.875rem',
    backgroundColor: 'white',
    outline: 'none',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")',
    backgroundPosition: 'right 0.5rem center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1.5em 1.5em',
    paddingRight: '2.5rem',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
    height: '2.5rem',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  deleteIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.5rem',
    height: '1.5rem',
    borderRadius: '50%',
    backgroundColor: '#F3F4F6',
    color: '#6B7280',
    cursor: 'pointer',
    fontSize: '14px',
    marginLeft: '0.5rem',
    border: 'none',
    outline: 'none',
    transition: 'background-color 0.15s ease-in-out, color 0.15s ease-in-out'
  },
  deleteIconHover: {
    backgroundColor: '#FEE2E2',
    color: '#EF4444',
  },
  actionColumn: {
    width: '120px',
    textAlign: 'right',
  },
  successMessage: {
    backgroundColor: '#ECFDF5',
    border: '1px solid #10B981',
    color: '#047857',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    bottom: '1.5rem',
    right: '1.5rem',
    zIndex: 50,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  },
  // Clay-inspired styles
  icon: {
    width: '1rem',
    height: '1rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: '500',
    padding: '0.125rem 0.5rem'
  },
  badgeBlue: {
    backgroundColor: '#EEF2FF',
    color: '#4F46E5'
  },
  badgeGreen: {
    backgroundColor: '#ECFDF5',
    color: '#10B981'
  },
  tooltipContainer: {
    position: 'relative',
    display: 'inline-block'
  },
  tooltip: {
    position: 'absolute',
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#1F2937',
    color: 'white',
    borderRadius: '0.25rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
    zIndex: 100,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    marginBottom: '0.5rem',
    pointerEvents: 'none',
    opacity: 0,
    transition: 'opacity 0.15s ease-in-out'
  },
  // Responsive behaviors
  resizeHandle: {
    width: '5px',
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    cursor: 'col-resize',
    opacity: 0,
    zIndex: 10,
    transition: 'opacity 0.15s ease-in-out, background-color 0.15s ease-in-out'
  },
  resizeHandleVisible: {
    opacity: 1,
    backgroundColor: 'rgba(99, 102, 241, 0.2)'
  },
  // Row hover
  tableRowHover: {
    backgroundColor: 'rgba(249, 250, 251, 0.5)'
  }
};

export default styles;