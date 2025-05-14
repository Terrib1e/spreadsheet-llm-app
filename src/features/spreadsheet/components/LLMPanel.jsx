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
        <h2 style={styles.llmTitle}>LLM-powered Analysis</h2>
      </div>
      <div style={styles.llmContent}>
        <div style={styles.col3}>
          <label style={styles.fieldLabel}>
            Source Column
          </label>
          <select
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
            style={styles.select}
            disabled={isGenerating}
          >
            {columns.map(column => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>
        <div style={styles.col7}>
          <label style={styles.fieldLabel}>
            Prompt
          </label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            style={styles.inputField}
            placeholder="What would you like to analyze?"
            disabled={isGenerating}
          />
        </div>
        <div style={styles.col2}>
          <button
            onClick={generateColumnWithLLM}
            style={isGenerating || apiStatus === 'error'
              ? { ...styles.blueButton, ...styles.disabledButton, width: '100%' }
              : { ...styles.blueButton, width: '100%' }}
            disabled={isGenerating || apiStatus === 'error'}
          >
            {isGenerating
              ? 'Generating...'
              : classificationColumnExists
                ? 'Update Classification'
                : 'Generate Classification'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LLMPanel;