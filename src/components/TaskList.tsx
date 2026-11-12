import { useTaskContext } from '../hooks/useTaskContext';
import { filterTasks } from '../utils/taskSelectors';
import TaskItem from './TaskItem';

function TaskList() {
  const { tasks, filter } = useTaskContext();
  const visibleTasks = filterTasks(tasks, filter);

  if (tasks.length === 0) {
    return (
      <div className="alert alert-secondary text-center mb-0">
        <p className="mb-0">Завдань поки немає.</p>
        <p className="mb-0">Додайте перше навчальне завдання.</p>
      </div>
    );
  }

  if (visibleTasks.length === 0) {
    return (
      <div className="alert alert-secondary text-center mb-0">
        <p className="mb-0">За цим фільтром завдань немає.</p>
      </div>
    );
  }

  return (
    <ul className="list-group shadow-sm">
      {visibleTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;
