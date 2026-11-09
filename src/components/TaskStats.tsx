interface TaskStatsProps {
  total: number;
  completed: number;
  active: number;
}

function TaskStats({ total, completed, active }: TaskStatsProps) {
  const items = [
    { label: 'Усього', value: total, valueClass: '' },
    { label: 'Виконано', value: completed, valueClass: 'text-success' },
    { label: 'Не виконано', value: active, valueClass: 'text-primary' },
  ];

  return (
    <div className="row g-3">
      {items.map(({ label, value, valueClass }) => (
        <div className="col-4" key={label}>
          <div className="card text-center h-100">
            <div className="card-body py-3">
              <div className={`fs-3 fw-bold ${valueClass}`}>{value}</div>
              <div className="small text-body-secondary">{label}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskStats;
