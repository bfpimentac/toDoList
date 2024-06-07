import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api';

const User: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', password: '' });
  const deleteUserMutation = api.user.deleteUser.useMutation();
  const { data: userData, refetch } = api.user.getUser.useQuery();
  const editUserMutation = api.user.editUser.useMutation(); // Use useMutation aqui

  useEffect(() => {
    if (userData) {
      setUser(userData);
      setName(userData.name || '');
      setEmail(userData.email || '');
    }
  }, [userData]);

  const handleEdit = () => {
    const editedUser = { name, email, password };

    editUserMutation.mutate(
      editedUser,
      {
        onSuccess: () => {
          setUser(editedUser);
          setPassword('');
          setErrors({ name: '', password: '' });
        },
        onError: (error) => {
          if (error.data?.errors) {
            setErrors(error.data.errors);
          }
        },
      }
    );
  };

  const handleDelete = () => {
    deleteUserMutation.mutate(
      { id: user.id },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Meu Perfil</h1>
      {user && (
        <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
          <div style={styles.inputContainer}>
            <label htmlFor="name" style={styles.label}>
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
            {errors.name && <p style={styles.error}>{errors.name}</p>}
          </div>
          <div style={styles.inputContainer}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ ...styles.input, ...styles.emailInput }}
              required
            />
          </div>
          <div style={styles.inputContainer}>
            <label htmlFor="password" style={styles.label}>
              Nova Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
            {errors.password && <p style={styles.error}>{errors.password}</p>}
          </div>
          <button type="button" onClick={handleEdit} style={styles.button}>
            Salvar
          </button>
        </form>
      )}
      <button type="button" onClick={handleDelete} style={styles.deleteButton}>
        Excluir Conta
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '300px',
  },
  inputContainer: {
    width: '100%',
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  emailInput: {},
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginBottom: '10px',
  },
  deleteButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: 'red',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px',
  },
};

export default User;
