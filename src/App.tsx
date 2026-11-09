import { useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskStats from './components/TaskStats';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import { initialTasks } from './data/initialTasks';
import type { NewTask, Task, TaskFilter } from './types/task';
import { countTasks, filterTasks } from './utils/taskSelectors';

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<TaskFilter>('all');

  const addTask = (newTask: NewTask) => {
    setTasks((prev) => {
      const nextId = prev.reduce((max, task) => Math.max(max, task.id), 0) + 1;
      return [...prev, { ...newTask, id: nextId, completed: false }];
    });
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)),
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const counts = countTasks(tasks);
  const visibleTasks = filterTasks(tasks, filter);

  return (
    <div className="container py-4">
      <div className="mx-auto" style={{ maxWidth: 720 }}>
        <Header />
        <section className="mt-4">
          <TaskForm onAdd={addTask} />
        </section>
        <section className="mt-4">
          <TaskStats total={counts.all} completed={counts.completed} active={counts.active} />
        </section>
        <section className="mt-4">
          <TaskFilters filter={filter} counts={counts} onChange={setFilter} />
        </section>
        <section className="mt-3">
          <TaskList
            tasks={visibleTasks}
            hasTasks={tasks.length > 0}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        </section>
      </div>
    </div>
  );
}

export default App;
