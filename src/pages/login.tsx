import React, { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        <button onClick={async (e) => {
          e.preventDefault();
          await signIn('credentials', { email, password, callbackUrl: '/home' }).catch((error) => {
            console.error('Sign in error', error);
          });
        }} style={styles.submitButton}>Login</button>
      </form>

    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    marginTop: '50px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%', 
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  submitButton: {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',

  },
  registerLink: {
    marginTop: '20px',
    textAlign: 'center',
  },
};

export default LoginPage;
