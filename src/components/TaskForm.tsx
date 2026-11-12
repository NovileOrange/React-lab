import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTaskContext } from '../hooks/useTaskContext';
import type { Priority, Task } from '../types/task';

interface TaskFormProps {
  task?: Task;
  onFinish?: () => void;
}

function TaskForm({ task, onFinish }: TaskFormProps) {
  const { addTask, updateTask } = useTaskContext();
  const isEditing = task !== undefined;

  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');
  const [category, setCategory] = useState(task?.category ?? '');
  const [priority, setPriority] = useState<Priority>(task?.priority ?? 'medium');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const values = {
      title: title.trim(),
      description: description.trim(),
      category: category.trim() || 'Загальне',
      priority,
    };

    const success = task ? updateTask(task.id, values) : addTask(values);

    if (!success) {
      setError('Назва завдання є обов’язковою.');
      return;
    }

    if (!isEditing) {
      setTitle('');
      setDescription('');
      setCategory('');
      setPriority('medium');
    }
    setError('');
    onFinish?.();
  };

  const idPrefix = task ? `task-${task.id}` : 'task-new';

  return (
    <form
      className={isEditing ? 'card card-body border-primary' : 'card card-body shadow-sm'}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor={`${idPrefix}-title`}>
          Назва *
        </label>
        <input
          id={`${idPrefix}-title`}
          className={error ? 'form-control is-invalid' : 'form-control'}
          type="text"
          value={title}
          placeholder="Наприклад, повторити useReducer"
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
        />
        {error && (
          <div className="invalid-feedback" role="alert">
            {error}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor={`${idPrefix}-description`}>
          Опис
        </label>
        <textarea
          id={`${idPrefix}-description`}
          className="form-control"
          rows={2}
          value={description}
          placeholder="Короткий опис завдання"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold" htmlFor={`${idPrefix}-category`}>
            Категорія
          </label>
          <input
            id={`${idPrefix}-category`}
            className="form-control"
            type="text"
            value={category}
            placeholder="React, TypeScript..."
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold" htmlFor={`${idPrefix}-priority`}>
            Пріоритет
          </label>
          <select
            id={`${idPrefix}-priority`}
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <option value="low">Низький</option>
            <option value="medium">Середній</option>
            <option value="high">Високий</option>
          </select>
        </div>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-primary" type="submit">
          {isEditing ? 'Зберегти' : 'Додати'}
        </button>
        {isEditing && (
          <button className="btn btn-outline-secondary" type="button" onClick={onFinish}>
            Скасувати
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
