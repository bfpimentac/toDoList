import React, { useState } from 'react';
import Link from 'next/link';
import { api } from '@/utils/api';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const getPriorityLabel = (priority: string) => {
  switch (priority) {
    case 'LOW':
      return 'Baixa';
    case 'MEDIUM':
      return 'Média';
    case 'HIGH':
      return 'Alta';
    default:
      return '';
  }
};

const List: React.FC = () => {
  const { data: tasks, refetch } = api.task.getTask.useQuery();
  const deleteTaskMutation = api.task.deleteTask.useMutation();
  const editTaskMutation = api.task.editTask.useMutation();
  const { data: user } = api.user.getUser.useQuery();

  const toggleCompletion = (taskId: string) => {
    editTaskMutation.mutate(
      { id: taskId, done: true, endDate: new Date().toISOString() },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const deleteTask = (taskId: string) => {
    deleteTaskMutation.mutate(
      { id: taskId },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  const renderTasks = (priority: string) => {
    return tasks
      ?.filter(task => task.priority === priority && !task.done)
      .map(task => (
        <TaskCard
          key={task.id}
          task={task}
          isOwner={user?.id === task.userId}
          onDelete={deleteTask}
          onToggleCompletion={toggleCompletion}
          onSave={() => refetch()}
        />
      ));
  };

  const renderCompletedTasks = () => {
    return tasks
      ?.filter(task => task.done)
      .map(task => (
        <TaskCard
          key={task.id}
          task={task}
          isOwner={user?.id === task.userId}
          onSave={() => refetch()}
        />
      ));
  };

  return (
    <div style={styles.container}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2>Tarefas</h2>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <div style={{ ...styles.column, flexBasis: '30%', marginRight: '10px' }}>
          <h2>Baixa Prioridade</h2>
          {renderTasks('LOW')}
        </div>
        <div style={{ ...styles.column, flexBasis: '30%', marginRight: '10px' }}>
          <h2>Média Prioridade</h2>
          {renderTasks('MEDIUM')}
        </div>
        <div style={{ ...styles.column, flexBasis: '30%', marginRight: '10px' }}>
          <h2>Alta Prioridade</h2>
          {renderTasks('HIGH')}
        </div>
        <div style={{ ...styles.column, flexBasis: '30%' }}>
          <h2>Tarefas Concluídas</h2>
          {renderCompletedTasks()}
        </div>
      </div>
      <Link href="/createTask" passHref>
        <button style={styles.addButton}>+</button>
      </Link>
    </div>
  );
};

const TaskCard: React.FC<{
  task: any;
  isOwner: boolean;
  onDelete?: (taskId: string) => void;
  onToggleCompletion?: (taskId: string) => void;
  onSave?: () => void;
}> = ({ task, isOwner, onDelete, onToggleCompletion, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const editTaskMutation = api.task.editTask.useMutation();
  const saveTask = () => {
    editTaskMutation.mutate(
      {
        id: task.id,
        name: editedTask.name,
        description: editedTask.description,
        priority: editedTask.priority,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          onSave && onSave();
        },
      }
    );
  };

  return (
    <div style={styles.task}>
    {isOwner && !task.done && (
  <div style={styles.iconContainer}>
    <FiEdit onClick={() => setIsEditing(!isEditing)} style={styles.icon} />
    <FiTrash2 onClick={() => onDelete && onDelete(task.id)} style={styles.icon} />
  </div>
)}
      {isEditing ? (
        <>
          <input
            name="name"
            value={editedTask.name}
            onChange={handleEditChange}
            style={styles.input}
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleEditChange}
            style={styles.textarea}
          />
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleEditChange}
            style={styles.select}
          >
            <option value="LOW">Baixa</option>
            <option value="MEDIUM">Média</option>
            <option value="HIGH">Alta</option>
          </select>
          <button onClick={saveTask} style={styles.saveButton}>Salvar</button>
        </>
      ) : (
        <>
          <h3 style={{ overflowWrap: 'anywhere' }}>{task.name}</h3>
          <p><strong>Prioridade:</strong> {getPriorityLabel(task.priority)}</p>
          <p><strong>Descrição:</strong> {task.description}</p>
          {!task.done && <button onClick={() => onToggleCompletion && onToggleCompletion(task.id)}>Finalizei</button>}
          {task.done && <p><strong>Data de Término:</strong> {task.endDate ? new Date(task.endDate).toLocaleDateString('pt-br', { hour: '2-digit', minute: '2-digit' }) : 'Sem data'}</p>}
        </>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  column: {
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
      width: '400px'
  },
  task: {
    marginBottom: '15px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '5px',
  
  },
  iconContainer: {
    top: '10px',
    right: '10px',
    display: 'flex',
    gap: '10px',
  },
  icon: {
    cursor: 'pointer',
    fontSize: '18px',
  },
  input: {
    width: '100%',
    padding: '8px',
    margin: '8px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    margin: '8px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    resize: 'none',
  },
  select: {
    width: '100%',
    padding: '8px',
    margin: '8px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  saveButton: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  addButton: {
    fontSize: '24px',
    width: '100px',
    height: '50px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    marginTop: '20px',
  },
};

export default List;
