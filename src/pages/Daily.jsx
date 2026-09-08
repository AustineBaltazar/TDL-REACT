import { useState } from "react";
import "./TaskPage.css";

function Daily() {
  const [task, setTask] = useState("");
  const [toDoList, setToDoList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    const newTask = {
      id: Date.now(),
      task: trimmedTask,
      status: "incomplete",
    };

    setToDoList((currentTasks) => [...currentTasks, newTask]);
    setTask("");
  };

  const deleteTask = (id) => {
    setToDoList((currentTasks) =>
      currentTasks.filter((task) => task.id !== id),
    );
  };

  const updateTaskStatus = (id, status) => {
    setToDoList((currentTasks) =>
      currentTasks.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  };

  return (
    <div className="task-page">
      <div className="task-card">
        <div className="task-header">
          <div>
            <p className="task-label">Overview</p>
            <h2>Daily Tasks</h2>
          </div>
          <span className="task-counter">{toDoList.length} items</span>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="task-input"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            name="task"
            placeholder="Enter your task"
          />
          <button type="submit" className="task-button">
            Add Task here
          </button>
        </form>

        <div className="task-list">
          {toDoList.length === 0 ? (
            <p className="empty-state">
              No tasks yet. Add your first daily task.
            </p>
          ) : (
            toDoList.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-main">
                  <span className={`task-status ${task.status}`}>
                    {task.status}
                  </span>
                  <span className="task-text">{task.task}</span>
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

export default Daily;
