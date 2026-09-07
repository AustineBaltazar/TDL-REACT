import { useState } from "react";
import "./TaskPage.css";

export default function Weekly() {
  const [task, setTask] = useState("");
  const [toDo, setTodo] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    const newTask = {
      id: Date.now(),
      text: trimmedTask,
      status: "incomplete",
    };

    setTodo((currentTasks) => [...currentTasks, newTask]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTodo((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  const updateTaskStatus = (id, status) => {
    setTodo((currentTasks) =>
      currentTasks.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  };

  return (
    <div className="task-page">
      <div className="task-card">
        <div className="task-header">
          <div>
            <p className="task-label">Schedule</p>
            <h2>Weekly Tasks</h2>
          </div>
          <span className="task-counter">{toDo.length} items</span>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="task-input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task"
          />
          <button type="submit" className="task-button">
            Add Task
          </button>
        </form>

        <div className="task-list">
          {toDo.length === 0 ? (
            <p className="empty-state">
              No weekly tasks yet. Add your plan for the week.
            </p>
          ) : (
            toDo.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-main">
                  <span className={`task-status ${task.status}`}>
                    {task.status}
                  </span>
                  <span className="task-text">{task.text}</span>
                </div>

                <div className="task-actions">
                  <button
                    className="task-action-btn toggle"
                    onClick={() =>
                      updateTaskStatus(
                        task.id,
                        task.status === "complete" ? "incomplete" : "complete",
                      )
                    }
                  >
                    {task.status === "complete"
                      ? "Mark Incomplete"
                      : "Mark Complete"}
                  </button>
                  <button
                    className="task-action-btn delete"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
