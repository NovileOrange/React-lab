import { useState } from 'react';
import { useTaskContext } from '../hooks/useTaskContext';
import type { Priority, Task } from '../types/task';
import TaskForm from './TaskForm';

interface TaskItemProps {
  task: Task;
}

const priorityLabels: Record<Priority, string> = {
  low: 'Низький',
  medium: 'Середній',
  high: 'Високий',
};

const priorityBadgeClasses: Record<Priority, string> = {
  low: 'text-bg-success',
  medium: 'text-bg-warning',
  high: 'text-bg-danger',
};

function TaskItem({ task }: TaskItemProps) {
  const { toggleTask, requestDelete, pendingDelete } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const { id, title, description, completed, priority, category } = task;

  const isPending = pendingDelete?.ids.includes(id) ?? false;

  if (isEditing) {
    return (
      <li className="list-group-item p-0">
        <TaskForm task={task} onFinish={() => setIsEditing(false)} />
      </li>
    );
  }

  const itemClasses = ['list-group-item'];
  if (isPending) itemClasses.push('list-group-item-warning', 'opacity-50');
  else if (completed) itemClasses.push('list-group-item-success');

  return (
    <li className={itemClasses.join(' ')}>
      <div className="d-flex flex-column flex-md-row justify-content-between gap-3">
        <div>
          <h3
            className={
              completed
                ? 'h5 mb-1 text-decoration-line-through text-body-secondary'
                : 'h5 mb-1'
            }
          >
            {title}
          </h3>
          {description && <p className="mb-2 text-body-secondary">{description}</p>}
          <div className="d-flex flex-wrap gap-2">
            <span className="badge text-bg-primary">{category}</span>
            <span className={`badge ${priorityBadgeClasses[priority]}`}>
              {priorityLabels[priority]}
            </span>
            <span className="badge text-bg-secondary">
              {completed ? 'Виконано' : 'Не виконано'}
            </span>
            {isPending && <span className="badge text-bg-warning">Буде видалено</span>}
          </div>
        </div>

        <div className="d-flex flex-wrap align-items-start gap-2 flex-shrink-0">
          <button
            type="button"
            className="btn btn-sm btn-outline-success"
            disabled={isPending}
            onClick={() => toggleTask(id)}
          >
            {completed ? 'Повернути' : 'Виконано'}
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            disabled={isPending}
            onClick={() => setIsEditing(true)}
          >
            Редагувати
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            disabled={isPending}
            onClick={() => requestDelete(id)}
          >
            Видалити
          </button>
        </div>
      </div>
    </li>
  );
}

export default TaskItem;
