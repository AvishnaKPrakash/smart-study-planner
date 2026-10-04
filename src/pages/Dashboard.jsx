import { useState, useEffect } from "react"
import StudyTimer from "../components/StudyTimer"

function Dashboard() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
  function loadTasks() {
    const savedTasks =
      JSON.parse(localStorage.getItem("studyTasks")) || []

    setTasks(savedTasks)
  }

  loadTasks()

  window.addEventListener("storage", loadTasks)

  return () => {
    window.removeEventListener("storage", loadTasks)
  }
}, [])

  const totalTasks = tasks.length

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length

  const pendingTasks = totalTasks - completedTasks

  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100)
    const today = new Date().toISOString().split("T")[0]

    const todayTasks = tasks.filter(
        (task) => task.date === today
    )
    const todayCompletedMinutes = todayTasks
       .filter((task) => task.completed)
       .reduce(
           (total, task) => total + Number(task.duration),
            0
        )


     const dailyGoalMinutes = 4 * 60

     const goalPercentage = Math.min(
        Math.round(
          (todayCompletedMinutes / dailyGoalMinutes) * 100
        ),
        100
     )
     const completedDates = [
  ...new Set(
    tasks
      .filter((task) => task.completed)
      .map((task) => task.date)
  )
].sort().reverse()

let streak = 0
let currentDate = new Date()

for (const date of completedDates) {
  const dateString = currentDate
    .toISOString()
    .split("T")[0]

  if (date === dateString) {
    streak++
    currentDate.setDate(currentDate.getDate() - 1)
  } else {
    break
  }
}
  return (
    <div className="dashboard">
      <StudyTimer />
      <div className="welcome-section">
        <h2>Good Evening! 👋</h2>
        <p>Stay focused and keep moving towards your study goals.</p>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div>
            <p>Total Tasks</p>
            <h3>{totalTasks}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div>
            <p>Completed</p>
            <h3>{completedTasks}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div>
            <p>Pending</p>
            <h3>{pendingTasks}</h3>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div>
            <p>Completion</p>
            <h3>{completionPercentage}%</h3>
          </div>
        </div>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Today's Study Goal</h3>
            <span>2 / 4 hrs</span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>

          <p className="card-description">
            Keep studying to reach your daily goal!
          </p>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Study Streak 🔥</h3>
          </div>

          <div className="streak-number">{streak}  Days</div>

          <p className="card-description">
            Great consistency! Keep your streak going.
          </p>
        </div>

      </div>

      <div className="dashboard-card today-tasks">

        <div className="card-header">
          <h3>Today's Study Tasks</h3>
          <span>{todayTasks.length} Tasks</span>
        </div>

        {todayTasks.length === 0 ? (
          <p className="card-description">
            No study tasks added yet.
          </p>
        ) : (
          todayTasks.map((task) => (
            <div className="task-item" key={task.id}>

              <div>
                <h4>{task.subject}</h4>
                <p>{task.topic}</p>
              </div>

              <span
                className={`priority ${task.priority.toLowerCase()}`}
              >
                {task.priority}
              </span>

            </div>
          ))
        )}

      </div>

    </div>
  )
}

export default Dashboard