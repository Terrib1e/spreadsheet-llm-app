import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

/**
 * Check the health of the API
 * @returns {Promise} Promise with API health response
 */
export const checkApiHealth = async () => {
  return axios.get(`${API_BASE_URL}/health`);
};

/**
 * Generate a new column based on data and a prompt
 * @param {Array} columnData - The data to use for generation
 * @param {String} prompt - The prompt to use for generation
 * @returns {Promise} Promise with the generated data
 */
export const generateColumn = async (columnData, prompt) => {
  return axios.post(`${API_BASE_URL}/generate-column`, {
    columnData,
    prompt
  });
};