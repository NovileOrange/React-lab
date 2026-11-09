import type { Task } from '../types/task';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  hasTasks: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TaskList({ tasks, hasTasks, onToggle, onDelete }: TaskListProps) {
  if (!hasTasks) {
    return (
      <div className="alert alert-secondary text-center mb-0">
        <p className="mb-0">Завдань поки немає.</p>
        <p className="mb-0">Додайте перше навчальне завдання.</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="alert alert-secondary text-center mb-0">
        <p className="mb-0">За цим фільтром завдань немає.</p>
      </div>
    );
  }

  return (
    <ul className="list-group shadow-sm">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default TaskList;
