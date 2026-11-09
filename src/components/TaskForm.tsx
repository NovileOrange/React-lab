import { useState } from 'react';
import type { FormEvent } from 'react';
import type { NewTask, Priority } from '../types/task';

interface TaskFormProps {
  onAdd: (task: NewTask) => void;
}

function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setError('Назва завдання є обов’язковою.');
      return;
    }

    onAdd({
      title: title.trim(),
      description: description.trim(),
      category: category.trim() || 'Загальне',
      priority,
    });

    setTitle('');
    setDescription('');
    setCategory('');
    setPriority('medium');
    setError('');
  };

  return (
    <form className="card card-body shadow-sm" onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label className="form-label fw-semibold" htmlFor="task-title">
          Назва *
        </label>
        <input
          id="task-title"
          className={error ? 'form-control is-invalid' : 'form-control'}
          type="text"
          value={title}
          placeholder="Наприклад, повторити useState"
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
        <label className="form-label fw-semibold" htmlFor="task-description">
          Опис
        </label>
        <textarea
          id="task-description"
          className="form-control"
          rows={2}
          value={description}
          placeholder="Короткий опис завдання"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label fw-semibold" htmlFor="task-category">
            Категорія
          </label>
          <input
            id="task-category"
            className="form-control"
            type="text"
            value={category}
            placeholder="React, TypeScript..."
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold" htmlFor="task-priority">
            Пріоритет
          </label>
          <select
            id="task-priority"
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

      <div>
        <button className="btn btn-primary" type="submit">
          Додати
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
