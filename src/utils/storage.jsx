// utils/storage.js
export const saveCalculation = (type, data) => {
    const today = new Date().toISOString().split('T')[0]; // e.g., "2025-04-22"
    const history = JSON.parse(localStorage.getItem(type)) || {};
    if (!history[today]) history[today] = [];
    history[today].push(data);
    localStorage.setItem(type, JSON.stringify(history));
  };
  
  export const getHistory = (type) => {
    return JSON.parse(localStorage.getItem(type)) || {};
  };
  
  export const clearHistory = (type) => {
    localStorage.removeItem(type);
  };
  