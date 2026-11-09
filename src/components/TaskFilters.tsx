import type { TaskFilter } from '../types/task';

interface TaskFiltersProps {
  filter: TaskFilter;
  counts: Record<TaskFilter, number>;
  onChange: (filter: TaskFilter) => void;
}

const filterOptions: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'Всі' },
  { value: 'completed', label: 'Виконані' },
  { value: 'active', label: 'Не виконані' },
];

function TaskFilters({ filter, counts, onChange }: TaskFiltersProps) {
  return (
    <div className="btn-group" role="group" aria-label="Фільтр завдань">
      {filterOptions.map(({ value, label }) => (
        <button
          key={value}
          type="button"
          className={value === filter ? 'btn btn-primary' : 'btn btn-outline-primary'}
          aria-pressed={value === filter}
          onClick={() => onChange(value)}
        >
          {label} ({counts[value]})
        </button>
      ))}
    </div>
  );
}

export default TaskFilters;
