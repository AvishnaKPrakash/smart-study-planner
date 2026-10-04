import { useState, useEffect } from "react"

function Schedule() {
  const defaultTasks = [
  {
    id: 1,
    subject: "Java",
    topic: "Collections Framework",
    date: "2026-09-27",
    duration: 60,
    priority: "High",
    completed: false
  },
  {
    id: 2,
    subject: "DBMS",
    topic: "SQL Queries",
    date: "2026-09-27",
    duration: 45,
    priority: "Medium",
    completed: true
  },
  {
    id: 3,
    subject: "React",
    topic: "React Hooks",
    date: "2026-09-28",
    duration: 90,
    priority: "Low",
    completed: false
  }
]

const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("studyTasks")

  return savedTasks ? JSON.parse(savedTasks) : defaultTasks
})


  const [search, setSearch] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [editingTask, setEditingTask] = useState(null)
  const [editTopic, setEditTopic] = useState("")
  const [editDate, setEditDate] = useState("")
  const [editDuration, setEditDuration] = useState("")
  const [editPriority, setEditPriority] = useState("Medium")
  useEffect(() => {
  localStorage.setItem("studyTasks", JSON.stringify(tasks))
}, [tasks])

  function toggleComplete(id) {
  const updatedTasks = tasks.map((task) =>
    task.id === id
      ? { ...task, completed: !task.completed }
      : task
  )

  setTasks(updatedTasks)

  window.dispatchEvent(new Event("tasksUpdated"))
}
  function deleteTask(id) {
  const updatedTasks = tasks.filter(
    (task) => task.id !== id
  )

  setTasks(updatedTasks)

  window.dispatchEvent(new Event("tasksUpdated"))
}
  function editTask(task) {
  setEditingTask(task)
  setEditTopic(task.topic)
  setEditDate(task.date)
  setEditDuration(task.duration)
  setEditPriority(task.priority)
}
  function saveEdit() {
  if (!editTopic || !editDate || !editDuration) {
    return
  }

  const updatedTasks = tasks.map((task) =>
    task.id === editingTask.id
      ? {
          ...task,
          topic: editTopic,
          date: editDate,
          duration: Number(editDuration),
          priority: editPriority
        }
      : task
  )

  setTasks(updatedTasks)
  setEditingTask(null)
}
  const filteredTasks = tasks.filter((task) => {

  const matchesSearch =
    `${task.subject} ${task.topic}`
      .toLowerCase()
      .includes(search.toLowerCase())

  const matchesPriority =
    priorityFilter === "All" ||
    task.priority === priorityFilter

  const matchesStatus =
    statusFilter === "All" ||
    (statusFilter === "Completed" && task.completed) ||
    (statusFilter === "Pending" && !task.completed)

  return matchesSearch && matchesPriority && matchesStatus
})

  return (
    <div className="schedule-page">

      <div className="page-heading">
        <h2>Study Schedule</h2>
        <p>View and manage all your study tasks.</p>
      </div>

      <div className="schedule-toolbar">

  <input
    type="text"
    placeholder="🔎 Search tasks..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
  >
    <option value="All">All Priorities</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="All">All Status</option>
    <option value="Pending">Pending</option>
    <option value="Completed">Completed</option>
  </select>

  <button
  className="clear-tasks-button"
  onClick={() => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      setTasks([])
      localStorage.removeItem("studyTasks")
      window.dispatchEvent(new Event("tasksUpdated"))
    }
  }}
>
  Clear All
</button>

</div>

      <div className="tasks-container">
        {editingTask && (
  <div className="edit-form-card">

    <h3>Edit Study Task</h3>

    <div className="form-group">
      <label>Topic</label>
      <input
        type="text"
        value={editTopic}
        onChange={(e) => setEditTopic(e.target.value)}
      />
    </div>

    <div className="form-group">
      <label>Study Date</label>
      <input
        type="date"
        value={editDate}
        onChange={(e) => setEditDate(e.target.value)}
      />
    </div>

    <div className="form-group">
      <label>Duration</label>
      <input
        type="number"
        min="1"
        value={editDuration}
        onChange={(e) => setEditDuration(e.target.value)}
      />
    </div>

    <div className="form-group">
      <label>Priority</label>
      <select
        value={editPriority}
        onChange={(e) => setEditPriority(e.target.value)}
      >
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
    </div>

    <div className="form-actions">
      <button
        className="add-task-button"
        onClick={saveEdit}
      >
        Save Changes
      </button>

      <button
        className="clear-tasks-button"
        onClick={() => setEditingTask(null)}
      >
        Cancel
      </button>
    </div>

  </div>
)}

        {filteredTasks.length === 0 ? (
          <div className="empty-tasks">
            <h3>No tasks found</h3>
            <p>Try searching for a different subject or topic.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              className={`task-card ${
                task.completed ? "completed-task" : ""
              }`}
              key={task.id}
            >

              <div className="task-main">

                <div className="task-checkbox">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                  />
                </div>

                <div className="task-details">
                  <h3>{task.subject}</h3>
                  <p>{task.topic}</p>
                  {task.notes && (
                    <p className="task-notes">
                       📝 {task.notes}
                    </p>
                  )}
                
                  <div className="task-info">
                    <span>📅 {task.date}</span>
                    <span>⏱️ {task.duration} min</span>
                  </div>
                </div>

              </div>

              <div className="task-actions">

                <span
                  className={`priority ${task.priority.toLowerCase()}`}
                >
                  {task.priority}
                </span>
                <button
                  className="edit-button"
                  onClick={() => editTask(task)}
             >
                  ✏️
                </button>
       
                <button
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                >
                  🗑️
                </button>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  )
}

export default Schedule
