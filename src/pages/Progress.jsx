import { useState, useEffect } from "react"

function Progress() {

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const savedTasks =
      JSON.parse(localStorage.getItem("studyTasks")) || []

    setTasks(savedTasks)
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

  const totalMinutes = tasks.reduce(
    (total, task) => total + Number(task.duration),
    0
  )

  const completedMinutes = tasks
    .filter((task) => task.completed)
    .reduce(
      (total, task) => total + Number(task.duration),
      0
    )

  return (
    <div className="progress-page">

      <div className="page-heading">
        <h2>Progress</h2>
        <p>Track your study performance and completion.</p>
      </div>

      <div className="progress-stats">

        <div className="progress-card">
          <span>📚</span>
          <p>Total Tasks</p>
          <h3>{totalTasks}</h3>
        </div>

        <div className="progress-card">
          <span>✅</span>
          <p>Completed</p>
          <h3>{completedTasks}</h3>
        </div>

        <div className="progress-card">
          <span>⏳</span>
          <p>Pending</p>
          <h3>{pendingTasks}</h3>
        </div>

        <div className="progress-card">
          <span>⏱️</span>
          <p>Study Hours</p>
          <h3>{(totalMinutes / 60).toFixed(1)}</h3>
        </div>

      </div>

      <div className="progress-main-card">

        <div className="progress-card-header">
          <h3>Overall Completion</h3>
          <strong>{completionPercentage}%</strong>
        </div>

        <div className="large-progress-bar">
          <div
            className="large-progress-fill"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>

        <p>
          {completedMinutes} minutes completed out of{" "}
          {totalMinutes} minutes planned.
        </p>

      </div>
      <div className="progress-main-card">

  <h3>Subject-wise Progress</h3>

  {[
    ...new Set(tasks.map((task) => task.subject))
  ].map((subject) => {

    const subjectTasks = tasks.filter(
      (task) => task.subject === subject
    )

    const subjectCompleted = subjectTasks.filter(
      (task) => task.completed
    ).length

    const subjectPercentage =
      subjectTasks.length === 0
        ? 0
        : Math.round(
            (subjectCompleted / subjectTasks.length) * 100
          )

    return (
      <div className="subject-progress" key={subject}>

        <div className="subject-progress-header">
          <span>{subject}</span>
          <strong>{subjectPercentage}%</strong>
        </div>

        <div className="subject-progress-bar">
          <div
            className="subject-progress-fill"
            style={{ width: `${subjectPercentage}%` }}
          ></div>
        </div>

        <p>
          {subjectCompleted} of {subjectTasks.length} tasks completed
        </p>

      </div>
    )
  })}

</div>
      <div className="progress-main-card">

        <h3>Study Summary</h3>

        <div className="summary-row">
          <span>Completed Tasks</span>
          <strong>{completedTasks}</strong>
        </div>

        <div className="summary-row">
          <span>Pending Tasks</span>
          <strong>{pendingTasks}</strong>
        </div>

        <div className="summary-row">
          <span>Total Study Time</span>
          <strong>{totalMinutes} minutes</strong>
        </div>

        <div className="summary-row">
          <span>Completed Study Time</span>
          <strong>{completedMinutes} minutes</strong>
        </div>

      </div>

    </div>
  )
}

export default Progress