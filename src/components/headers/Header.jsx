import React from 'react';

const MainHeader = () => {
  return (
    <div
      className="header"
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #ccc',
        padding: '0 200px',
        borderBlockColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        minHeight: 80
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row'
        }}
      >
        <a href="/home" target="_blank" rel="noopener noreferrer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Logo_IUH.png/800px-Logo_IUH.png"
            height={60}
            alt="Logo"
          />
        </a>
      </div>
    </div>
  );
}
export default MainHeader;