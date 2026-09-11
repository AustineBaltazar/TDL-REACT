import { useState } from "react";
import { useEffect } from "react";
import "./TaskPage.css";

function Daily() {
  const [task, setTask] = useState("");
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(
          "http://localhost:3000/todos?category=daily",
        );
        const data = await response.json();
        setToDoList(data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }

    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTask = task.trim();
    if (!trimmedTask) return;

    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: trimmedTask, category: "daily" }),
      });

      const newTodo = await response.json();

      setToDoList((currentTasks) => [...currentTasks, newTodo]);
      setTask("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });

      setToDoList((currentTasks) =>
        currentTasks.filter((task) => task.id !== id),
      );
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const updateTaskStatus = async (id, completed) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: completed }),
      });

      const updatedTodo = await response.json();

      setToDoList((currentTasks) =>
        currentTasks.map((task) => (task.id === id ? updatedTodo : task)),
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
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
                  <span
                    className={`task-status ${task.completed ? "complete" : "incomplete"}`}
                  >
                    {task.completed ? "Complete" : "Incomplete"}
                  </span>
                  <span className="task-text">{task.title}</span>
                </div>

                <div className="task-actions">
                  <button
                    className="task-action-btn toggle"
                    onClick={() =>
                      updateTaskStatus(
                        task.id,
                        task.completed === true ? false : true,
                      )
                    }
                  >
                    {task.completed === true
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
