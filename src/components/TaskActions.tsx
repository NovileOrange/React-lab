import { useTaskContext } from '../hooks/useTaskContext';

function TaskActions() {
  const { clearCompleted, resetTasks } = useTaskContext();

  return (
    <div className="d-flex flex-wrap gap-2">
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm"
        onClick={clearCompleted}
      >
        Очистити виконані
      </button>
      <button
        type="button"
        className="btn btn-outline-danger btn-sm"
        onClick={resetTasks}
      >
        Скинути дані
      </button>
    </div>
  );
}

export default TaskActions;
