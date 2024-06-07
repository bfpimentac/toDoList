import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Página Inicial</h1>
      <div style={styles.buttonContainer}>
        <Link href="/user" passHref>
          <button style={styles.button}>Cadastro de Usuário</button>
        </Link>
        <Link href="/list" passHref>
          <button style={styles.button}>Lista de Tarefas</button>
        </Link>
        <Link href="/myProfile" passHref>
          <button style={styles.button}>Meu Perfil</button>
        </Link>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Home;
