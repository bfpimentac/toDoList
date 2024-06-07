import { api } from '@/utils/api';
import React, { useState } from 'react';

const CreateTask: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">('LOW');
  const [errors, setErrors] = useState({ name: '', description: '' });
  const createTask = api.task.createTask.useMutation()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { name: '', description: '' };

    if (name.length < 5 && name.length > 50) {
      newErrors.name = 'O nome da tarefa deve ter no mínimo 5 caracteres';
      valid = false;
    }

    if (description.length > 140) {
      newErrors.description = 'A descrição da tarefa deve ter no máximo 140 caracteres';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log('Task Created:', { name, description, priority });
      createTask.mutate({name,description, priority})
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Criar Nova Tarefa</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label htmlFor="name" style={styles.label}>Nome</label>
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
          <label htmlFor="description" style={styles.label}>Descrição</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
            required
          />
          {errors.description && <p style={styles.error}>{errors.description}</p>}
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="priority" style={styles.label}>Prioridade</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            style={styles.select}
            required
          >
            <option value="LOW">Baixa</option>
            <option value="MEDIUM">Média</option>
            <option value="HIGH">Alta</option>
          </select>
        </div>
        <button onClick={handleSubmit}  type="submit" style={styles.button}>Criar Tarefa</button>
      </form>
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
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    minHeight: '100px',
  },
  select: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
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
  error: {
    color: 'red',
    fontSize: '14px',
    marginTop: '5px',
  },
};

export default CreateTask;
