import React from 'react';

const Loading = () => {
  return (
    <div style={styles.container}>
      <div style={styles.spinner}></div>
      <p>Loading...</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',  // TypeScript needs explicit type for flexDirection
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // full viewport height
    backgroundColor: '#f8f8f8',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    borderTop: '4px solid #3498db', // blue color
    animation: 'spin 1s linear infinite',
  },
};

// Add keyframes for spinner animation
const styleSheet = document.styleSheets[0];
const keyframes =
  `@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }`;

styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Loading;
