import { useTaskContext } from '../hooks/useTaskContext';
import type { TaskFilter } from '../types/task';
import { countTasks } from '../utils/taskSelectors';

const filterOptions: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'Всі' },
  { value: 'completed', label: 'Виконані' },
  { value: 'active', label: 'Не виконані' },
];

function TaskFilters() {
  const { tasks, filter, setFilter } = useTaskContext();
  const counts = countTasks(tasks);

  return (
    <div className="btn-group" role="group" aria-label="Фільтр завдань">
      {filterOptions.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={value === filter ? 'btn btn-primary' : 'btn btn-outline-primary'}
          aria-pressed={value === filter}
          onClick={() => setFilter(value)}
        >
          {label} ({counts[value]})
        </button>
      ))}
    </div>
  );
}

export default TaskFilters;
