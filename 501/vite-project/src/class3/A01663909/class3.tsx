import React from 'react';

const BlankPage: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '60px auto',
        padding: '30px',
        borderRadius: '10px',
        backgroundColor: '#fff5f2',
        boxShadow: '0 8px 20px rgba(255, 111, 97, 0.15)',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1 style={{ color: '#ff6f61', marginBottom: '20px' }}>Blank Page</h1>
      <p>This is a blank React component page.</p>
    
    </div>
  );
};

export default BlankPage;