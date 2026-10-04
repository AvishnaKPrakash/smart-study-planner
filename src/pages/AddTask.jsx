import { useState } from "react"
import { useNavigate } from "react-router-dom"

function AddTask() {
  const navigate = useNavigate()
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [date, setDate] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [duration, setDuration] = useState("")
  const [notes, setNotes] = useState("")
  const [message, setMessage] = useState("")

function handleSubmit(e) {
  e.preventDefault()

  if (!subject || !topic || !date || !duration) {
  setMessage("Please fill in all required fields.")
  return
}

if (Number(duration) <= 0) {
  setMessage("Duration must be greater than 0 minutes.")
  return
}
  const today = new Date().toISOString().split("T")[0]

if (date < today) {
  setMessage("Study date cannot be in the past.")
  return
}
  const newTask = {
    id: Date.now(),
    subject: subject,
    topic: topic,
    date: date,
    duration: Number(duration),
    priority: priority,
    notes: notes,
    completed: false
  }

  const existingTasks =
    JSON.parse(localStorage.getItem("studyTasks")) || []

  localStorage.setItem(
    "studyTasks",
    JSON.stringify([...existingTasks, newTask])
  )

  setMessage("Study task added successfully!")

  setSubject("")
  setTopic("")
  setDate("")
  setPriority("Medium")
  setDuration("")
  setNotes("")

  setTimeout(() => {
    navigate("/schedule")
  }, 700)
}

  return (
    <div className="add-task-page">

      <div className="page-heading">
        <h2>Add Study Task</h2>
        <p>Create a study task and organize your learning schedule.</p>
      </div>

      <div className="form-card">

        <div className="form-section-title">
          <h3>Task Information</h3>
          <p>Enter the details of your study session.</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Java"
              />
            </div>

            <div className="form-group">
              <label>Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Collections Framework"
              />
            </div>

            <div className="form-group">
              <label>Study Date</label>
              <input
                 type="date"
                 value={date}
                 min={new Date().toISOString().split("T")[0]}
                 onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Duration</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Minutes"
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

          </div>

          <div className="form-group full-width">
            <label>Notes</label>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this study session..."
              rows="4"
             ></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="add-task-button">
              + Add Study Task
            </button>
          </div>

        </form>

        {message && (
          <div className="form-message">
            {message}
          </div>
        )}

      </div>

    </div>
  )
}

export default AddTask