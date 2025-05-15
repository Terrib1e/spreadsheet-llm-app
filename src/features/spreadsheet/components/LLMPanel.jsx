import React from 'react';
import { useSpreadsheet } from '../context/SpreadsheetContext';
import styles from '../utils/styles';

const LLMPanel = () => {
  const {
    isGenerating,
    selectedColumn,
    setSelectedColumn,
    prompt,
    setPrompt,
    generateColumnWithLLM,
    columns,
    apiStatus
  } = useSpreadsheet();

  // Check if the "Major Classification" column already exists
  const classificationColumnExists = columns.includes("Major Classification");

  return (
    <div style={styles.llmPanel}>
      <div style={styles.llmHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1.25rem', height: '1.25rem', color: '#4F46E5' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h2 style={styles.llmTitle}>AI-Powered Analysis</h2>
        </div>
        {isGenerating && (
          <div style={{ ...styles.badge, backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '0.875rem', height: '0.875rem' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Processing...
          </div>
        )}
      </div>
      <div style={styles.llmContent}>
        <div style={styles.col3}>
          <label style={styles.fieldLabel}>
            Source Column
          </label>
          <div style={{ position: 'relative' }}>
            <select
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              style={{
                ...styles.select,
                textAlign: 'left'
              }}
              disabled={isGenerating}
              title={selectedColumn.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            >
              {columns.map(column => {
                const formattedName = column.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                return (
                  <option key={column} value={column} title={formattedName}>
                    {formattedName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div style={styles.col7}>
          <label style={styles.fieldLabel}>
            Analysis Prompt
          </label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={styles.inputField}
            placeholder="What would you like to analyze? e.g., 'Classify if this major makes them an engineer or non-engineer'"
            disabled={isGenerating}
          />
        </div>
        <div style={styles.col2}>
          <button
            onClick={generateColumnWithLLM}
            style={isGenerating || apiStatus === 'error'
              ? { ...styles.blueButton, ...styles.disabledButton, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '2.5rem', padding: '0 1rem' }
              : { ...styles.blueButton, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', height: '2.5rem', padding: '0 1rem' }}
            disabled={isGenerating || apiStatus === 'error'}
          >
            {isGenerating ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1rem', height: '1rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '1rem', height: '1rem' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {classificationColumnExists ? 'Update Classification' : 'Generate Classification'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LLMPanel;