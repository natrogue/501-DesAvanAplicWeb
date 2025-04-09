import React, { useState } from 'react';
import InputField from './inputField';
import Button from './button';

// Add props interface to receive setCurrentPage function
interface LoginProps {
  setCurrentPage?: React.Dispatch<React.SetStateAction<'home' | 'login' | 'blank' | 'navigation' | 'form'>>;
}

const Login: React.FC<LoginProps> = ({ setCurrentPage }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = () => {
    console.log('Username:', username);
    console.log('Password:', password);
    
    // Simple validation with hardcoded credentials
    if (username === 'user' && password === 'password') {
      // Navigate to the form page on successful login
      if (setCurrentPage) {
        setCurrentPage('form');
      } else {
        // If setCurrentPage is not provided, just log success
        console.log('Login successful, but navigation not available');
        alert('Login successful!');
      }
    } else {
      // Show an error message for invalid credentials
      setError('Invalid username or password');
    }
  };

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
      <h1 style={{ color: '#ff6f61', marginBottom: '20px' }}>Login</h1>
      
      {/* Display error message if login fails */}
      {error && (
        <p style={{ color: 'red', marginBottom: '15px', fontWeight: 'bold' }}>
          {error}
        </p>
      )}
      
      <InputField
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button label="Submit" onClick={handleSubmit} />
    </div>
  );
};

export default Login;