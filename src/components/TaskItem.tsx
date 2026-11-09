import type { Priority, Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
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

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const { id, title, description, completed, priority, category } = task;

  return (
    <li className={completed ? 'list-group-item list-group-item-success' : 'list-group-item'}>
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
          </div>
        </div>

        <div className="d-flex flex-wrap align-items-start gap-2 flex-shrink-0">
          <button
            type="button"
            className="btn btn-sm btn-outline-success"
            onClick={() => onToggle(id)}
          >
            {completed ? 'Повернути' : 'Виконано'}
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(id)}
          >
            Видалити
          </button>
        </div>
      </div>
    </li>
  );
}

export default TaskItem;
